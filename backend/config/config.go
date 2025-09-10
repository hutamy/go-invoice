package config

import (
	"log"
	"time"

	"github.com/caarlos0/env"
	"github.com/hutamy/go-invoice-backend/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

type Config struct {
	Port        int    `env:"PORT" envDefault:"8080"`
	JwtSecret   string `env:"JWT_SECRET"`
	DatabaseURL string `env:"DATABASE_URL"`
	SkipMigrate bool   `env:"SKIP_MIGRATE" envDefault:"false"` // Add option to skip migration
}

var (
	configuration Config
)

func LoadEnv() Config {
	err := godotenv.Load()
	if err != nil {
		log.Printf("No .env file found or failed to load .env file: %v", err)
	}

	if err := env.Parse(&configuration); err != nil {
		log.Fatalf("failed to parse environment variables: %v", err)
	}

	return configuration
}

func GetConfig() Config {
	return configuration
}

func InitDB(dbUrl string) *gorm.DB {
	// Configure GORM to work better with connection pools
	db, err := gorm.Open(postgres.Open(dbUrl), &gorm.Config{
		DisableForeignKeyConstraintWhenMigrating: true,
		PrepareStmt:                              false,                                // Disable prepared statements
		Logger:                                   logger.Default.LogMode(logger.Error), // Only log errors
	})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Get underlying sql.DB to configure connection pool
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("failed to get database instance: %v", err)
	}

	// Configure connection pool settings for Supabase
	sqlDB.SetMaxIdleConns(5)                  // Reduce idle connections
	sqlDB.SetMaxOpenConns(10)                 // Limit max connections
	sqlDB.SetConnMaxLifetime(5 * time.Minute) // Close connections after 5 minutes

	if err := sqlDB.Ping(); err != nil {
		log.Fatalf("failed to ping database: %v", err)
	}

	// Only migrate if not explicitly skipped
	cfg := GetConfig()
	if !cfg.SkipMigrate {
		log.Println("Running database migration...")
		migrate(db)
		log.Println("Migration completed successfully!")
	} else {
		log.Println("Skipping database migration (SKIP_MIGRATE=true)")
	}

	return db
}

func migrate(db *gorm.DB) {
	// Check if tables exist before migrating
	models := []interface{}{
		&models.User{},
		&models.Client{},
		&models.Invoice{},
		&models.InvoiceItem{},
	}

	for _, model := range models {
		if !db.Migrator().HasTable(model) {
			log.Printf("Creating table for %T...", model)
		} else {
			log.Printf("Table for %T already exists, checking for updates...", model)
		}
	}

	if err := db.AutoMigrate(models...); err != nil {
		log.Printf("Migration warning: %v", err)
	}
}
