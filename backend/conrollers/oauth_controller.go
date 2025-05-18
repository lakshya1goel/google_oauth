package controllers

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lakshya1goel/oauth/backend/utils"
)

func ExchangeToken(c *gin.Context) {
	code := c.Query("code")
	if code == "" {
		c.JSON(http.StatusBadRequest, gin.H{"success": false, "message": "Code is required"})
		return
	}

	token, err := utils.GoogleOAuthConfig.Exchange(c, code)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to exchange token: " + err.Error()})
		return
	}

	client := utils.GoogleOAuthConfig.Client(c, token)
	userInfoResp, err := client.Get("https://www.googleapis.com/oauth2/v1/userinfo?alt=json")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"success": false, "message": "Failed to get user info: " + err.Error()})
		return
	}
	defer userInfoResp.Body.Close()

	var userInfo map[string]interface{}
	body, _ := io.ReadAll(userInfoResp.Body)
	json.Unmarshal(body, &userInfo)
	fmt.Println("User Info:", userInfo)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "User logged in",
		"data": map[string]interface{}{
			"name":    userInfo["name"],
			"email":   userInfo["email"],
			"profile": userInfo["picture"],
			"verified": userInfo["verified_email"],
		},
	})
}