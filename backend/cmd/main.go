// @title Go Invoice API
// @version 1.0
// @description API documentation for your invoice app.
// @host localhost:8080
// @BasePath /
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization

package main

import (
	"fmt"
	"log"

	"github.com/go-playground/validator/v10"
	"github.com/hutamy/go-invoice-backend/config"
	"github.com/hutamy/go-invoice-backend/routes"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type CustomValidator struct {
	validator *validator.Validate
}

func (cv *CustomValidator) Validate(i interface{}) error {
	return cv.validator.Struct(i)
}

func main() {
	cfg := config.LoadEnv()
	db := config.InitDB(cfg.DatabaseURL)
	e := echo.New()
	e.Validator = &CustomValidator{validator: validator.New()}
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.HEAD, echo.PUT, echo.PATCH, echo.POST, echo.DELETE},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept, echo.HeaderAuthorization},
	}))
	routes.InitRoutes(e, db)

	log.Printf("Starting server on port: %d", cfg.Port)
	e.Logger.Fatal(e.Start(fmt.Sprintf(":%d", cfg.Port)))
}
