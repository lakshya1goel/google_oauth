package main

import (
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/lakshya1goel/oauth/backend/routes"
	"github.com/lakshya1goel/oauth/backend/utils"
)

func main() {
	if err := godotenv.Load(); err != nil {
		panic("Error loading .env file")
	}
	
	utils.InitGoogleOAuth()

	router := gin.Default()
	apiRouter := router.Group("/api")
	{
		routes.OauthRoutes(apiRouter)
	}

	router.Run(":8000")
}
