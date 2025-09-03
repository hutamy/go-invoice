package services

import (
	"github.com/hutamy/invoice-generator-backend/dto"
	"github.com/hutamy/invoice-generator-backend/models"
	"github.com/hutamy/invoice-generator-backend/repositories"
	"github.com/hutamy/invoice-generator-backend/utils"
	"github.com/hutamy/invoice-generator-backend/utils/errors"
)

type AuthService interface {
	SignUp(req dto.SignUpRequest) (models.User, error)
	SignIn(email, password string) (models.User, error)
	GetUserByID(id uint) (*models.User, error)
	ChangePassword(req dto.ChangePasswordRequest) error
	UpdateUserBanking(req dto.UpdateUserBankingRequest) error
	UpdateUserProfile(req dto.UpdateUserProfileRequest) error
	DeactivateUser(id uint) error
}

type authService struct {
	authRepo repositories.AuthRepository
}

func NewAuthService(authRepo repositories.AuthRepository) AuthService {
	return &authService{authRepo: authRepo}
}

func (s *authService) SignUp(req dto.SignUpRequest) (models.User, error) {
	existingUser, err := s.authRepo.GetUserByEmail(req.Email)
	if err != nil {
		return models.User{}, err
	}

	if existingUser != nil {
		return models.User{}, errors.ErrUserAlreadyExists
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return models.User{}, err
	}

	user := &models.User{
		Name:              req.Name,
		Email:             req.Email,
		Password:          string(hashedPassword),
		Address:           req.Address,
		Phone:             req.Phone,
		BankName:          req.BankName,
		BankAccountName:   req.BankAccountName,
		BankAccountNumber: req.BankAccountNumber,
	}

	if err := s.authRepo.CreateUser(user); err != nil {
		return models.User{}, err
	}

	user, err = s.authRepo.GetUserByEmail(req.Email)
	if err != nil {
		return models.User{}, err
	}

	return *user, nil
}

func (s *authService) SignIn(email, password string) (models.User, error) {
	user, err := s.authRepo.GetUserByEmail(email)
	if err != nil {
		return models.User{}, err
	}
	if user == nil {
		return models.User{}, errors.ErrLoginFailed
	}

	if !utils.CheckPasswordHash(password, user.Password) {
		return models.User{}, errors.ErrLoginFailed
	}

	return *user, nil
}

func (s *authService) GetUserByID(id uint) (*models.User, error) {
	return s.authRepo.GetUserByID(id)
}

func (s *authService) ChangePassword(req dto.ChangePasswordRequest) error {
	user, err := s.authRepo.GetUserByID(req.UserID)
	if err != nil {
		return err
	}

	if user == nil {
		return errors.ErrUserNotFound
	}

	if !utils.CheckPasswordHash(req.OldPassword, user.Password) {
		return errors.ErrInvalidOldPassword
	}

	hashedPassword, err := utils.HashPassword(req.NewPassword)
	if err != nil {
		return err
	}

	return s.authRepo.UpdatePassword(req.UserID, string(hashedPassword))
}

func (s *authService) UpdateUserBanking(req dto.UpdateUserBankingRequest) error {
	return s.authRepo.UpdateUserBanking(req)
}

func (s *authService) UpdateUserProfile(req dto.UpdateUserProfileRequest) error {
	return s.authRepo.UpdateUserProfile(req)
}

func (s *authService) DeactivateUser(id uint) error {
	return s.authRepo.DeleteUser(id)
}
