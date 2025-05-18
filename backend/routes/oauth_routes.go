package routes

import (
	"github.com/gin-gonic/gin"
	controllers "github.com/lakshya1goel/oauth/backend/conrollers"
)

func OauthRoutes(router *gin.RouterGroup) {
	oauthRouter := router.Group("/oauth")
	{
		oauthRouter.POST("/token", controllers.ExchangeToken)
	}
}