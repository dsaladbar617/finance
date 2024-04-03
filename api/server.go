package api

import (
	db "github.com/dsaladbar617/finance-tracker/db/sqlc"

	"github.com/gin-gonic/gin"
)

type Server struct {
	store db.Store
	router *gin.Engine
}

func NewServer(store db.Store) *Server {
	server := &Server{store: store}
	router := gin.Default()


	server.router = router
	return server
}

func (server *Server) setupRouter() {
	router := gin.Default()

	router.POST("/account/create")
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}