package db

import (
	"context"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestCreateAccount(t *testing.T) {
	arg := CreateAccountParams{
		Username:  "Dan Salley",
		FirstName: "Daniel",
		LastName:  "Salazar",
		Email:     "dsajkl;f@fsda.com",
		Password:  "secret",
	}

	account, err := testQueries.CreateAccount(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, account)

	require.Equal(t, account.Username, arg.Username)
	require.Equal(t, account.FirstName, arg.FirstName)
	require.Equal(t, account.LastName, arg.LastName)
	require.Equal(t, account.Email, arg.Email)
	require.Equal(t, account.Password, arg.Password)

	require.NotZero(t, account.ID)
	require.NotZero(t, account.CreatedAt)
}

func TestGetAccount(t *testing.T) {

}
