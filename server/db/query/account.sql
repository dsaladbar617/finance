-- name: CreateAccount :one
INSERT INTO accounts (
  username,
  first_name,
  last_name,
  email,
  password
) VALUES (
  $1, $2, $3, $4, $5
)
RETURNING *;

-- name: GetAccount :one
SELECT * FROM accounts
WHERE username = $1 LIMIT 1;