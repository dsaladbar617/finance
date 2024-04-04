// Code generated by sqlc. DO NOT EDIT.
// source: account.sql

package db

import (
	"context"
)

const createAccount = `-- name: CreateAccount :one
INSERT INTO accounts (
  username,
  full_name,
  email,
  password
) VALUES (
  $1, $2, $3, $4
)
RETURNING id, username, full_name, email, password, created_at
`

type CreateAccountParams struct {
	Username string `json:"username"`
	FullName string `json:"full_name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (q *Queries) CreateAccount(ctx context.Context, arg CreateAccountParams) (Account, error) {
	row := q.db.QueryRowContext(ctx, createAccount,
		arg.Username,
		arg.FullName,
		arg.Email,
		arg.Password,
	)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.FullName,
		&i.Email,
		&i.Password,
		&i.CreatedAt,
	)
	return i, err
}

const getAccount = `-- name: GetAccount :one
SELECT id, username, full_name, email, password, created_at FROM accounts
WHERE id = $1 LIMIT 1
`

func (q *Queries) GetAccount(ctx context.Context, id int64) (Account, error) {
	row := q.db.QueryRowContext(ctx, getAccount, id)
	var i Account
	err := row.Scan(
		&i.ID,
		&i.Username,
		&i.FullName,
		&i.Email,
		&i.Password,
		&i.CreatedAt,
	)
	return i, err
}