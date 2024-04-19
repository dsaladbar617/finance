package db

import (
	"context"
	"testing"
	"time"

	"github.com/dsaladbar617/finance-tracker/util"
	"github.com/stretchr/testify/require"
)

func createRandomAccount(t *testing.T) Account {
	hashedPassword, err := util.HashPassword(util.RandomString(6))
	require.NoError(t, err)

	arg := CreateAccountParams{
		Username:  util.RandomString(8),
		FirstName: util.RandomString(5),
		LastName:  util.RandomString(6),
		Email:     util.RandomEmail(),
		Password:  hashedPassword,
	}

	account, err := testQueries.CreateAccount(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, account)

	require.Equal(t, arg.FirstName, account.FirstName)
	require.Equal(t, arg.LastName, account.LastName)
	require.Equal(t, arg.Email, account.Email)
	require.Equal(t, arg.Password, account.Password)
	require.Equal(t, arg.Username, account.Username)

	require.NotZero(t, account.CreatedAt)

	return account
}

func TestCreateAccount(t *testing.T) {
	createRandomAccount(t)
}

func TestGetAccount(t *testing.T) {
	account1 := createRandomAccount(t)
	account2, err := testQueries.GetAccount(context.Background(), account1.Username)
	require.NoError(t, err)
	require.NotEmpty(t, account2)

	require.Equal(t, account1.FirstName, account2.FirstName)
	require.Equal(t, account1.LastName, account2.LastName)
	require.Equal(t, account1.Username, account2.Username)
	require.Equal(t, account1.Email, account2.Email)
	require.Equal(t, account1.Password, account2.Password)
	require.WithinDuration(t, account1.CreatedAt, account2.CreatedAt, time.Second)

}
