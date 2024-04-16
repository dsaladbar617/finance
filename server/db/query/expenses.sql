-- name: CreateExpense :one
INSERT INTO expenses (
  account_id,
  category_id,
  description,
  amount
) VALUES (
  $1, $2, $3, $4
)
RETURNING *;

-- name: GetExpense :one
Select * FROM expenses
WHERE id = $1 LIMIT 1;