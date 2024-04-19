package api

import (
	"database/sql"
	"net/http"
	"time"

	db "github.com/dsaladbar617/finance-tracker/db/sqlc"
	"github.com/dsaladbar617/finance-tracker/token"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
	"github.com/shopspring/decimal"
)

type createExpenseRequest struct {
	CategoryID  int64           `json:"category_id" binding:"required"`
	Description string          `json:"description" binding:"required"`
	Amount      decimal.Decimal `json:"amount" binding:"required"`
	DateAdded   time.Time       `json:"date_added" binding:"required"`
}

func (server *Server) createExpense(ctx *gin.Context) {
	var req createExpenseRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, errorResponse(err))
		return
	}

	// Use auth token to get username to get the account information to create an expense for the specified account.
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
		Amount:      req.Amount.String(),
		DateAdded:   req.DateAdded.Add(time.Second),
	}

	expense, err := server.store.CreateExpense(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, expense)

}

func (server *Server) listExpenses(ctx *gin.Context) {
	// Use auth token to get username to return all expenses that are created by the specified account.
	authPayload := ctx.MustGet(authorizationPayloadKey).(*token.Payload)

	account, err := server.store.GetAccount(ctx, authPayload.Username)
	if err != nil {
		if err == sql.ErrNoRows {
			ctx.JSON(http.StatusNotFound, errorResponse(err))
			return
		}
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	arg := db.ListExpensesParams{
		AccountID: account.ID,
		Limit:     50,
		Offset:    0,
	}

	expenses, err := server.store.ListExpenses(ctx, arg)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, expenses)

}

func (server *Server) getExpenseCategories(ctx *gin.Context) {
	categories, err := server.store.GetExpenseCategories(ctx)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, errorResponse(err))
		return
	}

	ctx.JSON(http.StatusOK, categories)
}
