package repositories

import (
	"errors"

	"github.com/hutamy/invoice-generator-backend/dto"
	"github.com/hutamy/invoice-generator-backend/models"
	"gorm.io/gorm"
)

type AuthRepository interface {
	CreateUser(user *models.User) error
	GetUserByEmail(email string) (*models.User, error)
	GetUserByID(id uint) (*models.User, error)
	UpdatePassword(id uint, password string) error
	UpdateUserProfile(req dto.UpdateUserProfileRequest) error
	UpdateUserBanking(req dto.UpdateUserBankingRequest) error
	DeleteUser(id uint) error
}

type authRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) AuthRepository {
	return &authRepository{db: db}
}

func (r *authRepository) CreateUser(user *models.User) error {
	return r.db.Create(&user).Error
}

func (r *authRepository) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := r.db.Where("email = ?", email).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}

	return &user, err
}

func (r *authRepository) GetUserByID(id uint) (*models.User, error) {
	var user models.User
	res := r.db.First(&user, id)
	if res.Error != nil {
		return nil, res.Error
	}

	return &user, nil
}

func (r *authRepository) UpdatePassword(id uint, password string) error {
	user := models.User{
		Password: password,
	}

	return r.db.Model(&user).Where("id = ?", id).Update("password", password).Error
}

func (r *authRepository) UpdateUserProfile(req dto.UpdateUserProfileRequest) error {
	user := models.User{}
	if req.Name != nil {
		user.Name = *req.Name
	}

	if req.Email != nil {
		user.Email = *req.Email
	}

	if req.Address != nil {
		user.Address = *req.Address
	}

	if req.Phone != nil {
		user.Phone = *req.Phone
	}

	res := r.db.Model(&models.User{}).Where("id = ?", req.UserID).Updates(user)
	return res.Error
}

func (r *authRepository) UpdateUserBanking(req dto.UpdateUserBankingRequest) error {
	user := models.User{}
	if req.BankName != nil {
		user.BankName = *req.BankName
	}

	if req.BankAccountName != nil {
		user.BankAccountName = *req.BankAccountName
	}

	if req.BankAccountNumber != nil {
		user.BankAccountNumber = *req.BankAccountNumber
	}

	res := r.db.Model(&models.User{}).Where("id = ?", req.UserID).Updates(user)
	return res.Error
}

func (r *authRepository) DeleteUser(id uint) error {
	err := r.db.Model(&models.User{}).
		Where("id = ?", id).
		Update("deleted_at", gorm.DeletedAt{Time: r.db.NowFunc(), Valid: true}).Error
	if err != nil {
		return err
	}

	return err
}
