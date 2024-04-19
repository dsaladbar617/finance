export type Expense = {
  id: number;
  category: string;
  description: string;
  amount: number;
  date_added: Date;
};

export type CreateExpenseInputs = {
  category_id: number;
  description: string;
  amount: number;
  date_added: Date;
};
