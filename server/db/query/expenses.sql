-- name: CreateExpense :one
INSERT INTO expenses (
  account_id,
  category_id,
  description,
  amount,
  date_added
) VALUES (
  $1, $2, $3, $4, $5
)
RETURNING *;

-- name: GetExpense :one
Select * FROM expenses
WHERE id = $1 LIMIT 1;

-- name: ListExpenses :many
Select expenses.id, description, amount, date_added, category
FROM expenses
JOIN expense_categories ON expenses.category_id = expense_categories.id
WHERE expenses.account_id = $1
ORDER BY expenses.id
LIMIT $2
OFFSET $3;

-- name: GetExpenseCategories :many
SELECT * FROM expense_categories
ORDER BY id;