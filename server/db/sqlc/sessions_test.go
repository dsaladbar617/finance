package db

import (
	"context"
	"testing"
	"time"

	"github.com/dsaladbar617/finance-tracker/token"
	"github.com/dsaladbar617/finance-tracker/util"
	"github.com/stretchr/testify/require"
)

func createRandomTokens(t *testing.T, username string) (string, *token.Payload, string, *token.Payload) {
	tokenMaker, err := token.NewPasetoMaker("12345678901234567890123456789012")
	require.NoError(t, err)

	accessDuration := time.Duration(15 * time.Minute)
	accessToken, accessPayload, err := tokenMaker.CreateToken(username, accessDuration)
	require.NoError(t, err)

	refreshDuration := time.Duration(24 * time.Hour)
	refreshToken, refreshPayload, err := tokenMaker.CreateToken(username, refreshDuration)
	require.NoError(t, err)

	return accessToken, accessPayload, refreshToken, refreshPayload
}

func TestCreateSession(t *testing.T) {
	account1 := createRandomAccount(t)

	_, _, refreshToken, refreshPayload := createRandomTokens(t, account1.Username)

	arg := CreateSessionParams{
		ID:           refreshPayload.ID,
		Username:     account1.Username,
		RefreshToken: refreshToken,
		UserAgent:    "",
		ClientIp:     util.RandomString(10),
		IsBlocked:    false,
		ExpiresAt:    refreshPayload.ExpiredAt,
	}

	session, err := testQueries.CreateSession(context.Background(), arg)
	require.NoError(t, err)
	require.NotEmpty(t, session)

	require.Equal(t, account1.Username, session.Username)
	require.Equal(t, session.ID, refreshPayload.ID)
	require.Equal(t, session.RefreshToken, refreshToken)
	require.Equal(t, session.IsBlocked, false)
	require.WithinDuration(t, session.ExpiresAt, refreshPayload.ExpiredAt, time.Second)
	require.NotEmpty(t, session.CreatedAt)

}
