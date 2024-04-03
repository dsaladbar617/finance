-- name: CreateAccount :one
INSERT INTO accounts (
  username,
  full_name,
  email,
  password
) VALUES (
  $1, $2, $3, $4
)
RETURNING *;

-- name: GetAccount :one
SELECT * FROM accounts
WHERE id = $1 LIMIT 1;