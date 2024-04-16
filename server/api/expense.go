package api

import (
	"net/http"

	db "github.com/dsaladbar617/finance-tracker/db/sqlc"
	"github.com/dsaladbar617/finance-tracker/token"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

type createExpenseRequest struct {
	AccountID   int64  `json:"account_id"`
	CategoryID  int64  `json:"category_id" binding:"required"`
	Description string `json:"description"`
	Amount      int64  `json:"amount" binding:"required"`
}

// type createExpenseResponse struct {
// 	AccountID   int64  `json:"account_id" binding:"required"`
// 	CategoryID  string `json:"category_id" binding:"required"`
// 	Description string `json:"description"`
// 	Amount      int64  `json:"amount" binding:"required"`
// }

func (server *Server) createExpense(ctx *gin.Context) {
	var req createExpenseRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	account, err := server.store.GetAccount(ctx, authPayload.Username)
	if err != nil {
		if pqErr, ok := err.(*pq.Error); ok {
			switch pqErr.Code.Name() {
			case "foreign_key_violation", "unique_violation":
				ctx.JSON(http.StatusForbidden, errorResponse(err))
				return
			}
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	arg := db.CreateExpenseParams{
		AccountID:   account.ID,
		CategoryID:  req.CategoryID,
		Description: req.Description,
		Amount:      req.Amount,
	}

	expense, err := server.store.CreateExpense(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, expense)

}
