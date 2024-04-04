package api

import (
	db "github.com/dsaladbar617/finance-tracker/db/sqlc"
	"github.com/dsaladbar617/finance-tracker/util"

	"github.com/gin-gonic/gin"
)

type Server struct {
	config util.Config
	store db.Store
	router *gin.Engine
}

func NewServer(config util.Config,store db.Store) *Server {
	server := &Server{
		config: config,
		store: store,
	}

	server.setupRouter()

	return server
}

func (server *Server) setupRouter() {
	router := gin.Default()

	router.POST("/account/create", server.createAccount)

	server.router = router
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}

func errorResponse(err error) gin.H {
	return gin.H{"error": err.Error()}
}