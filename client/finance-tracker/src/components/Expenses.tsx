import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../util/axios";
import { CreateExpenseInputs, Expense } from "../types/expense";
import { useForm } from "react-hook-form";
import { useCreateExpense } from "../util/useCreateExpense";
import styles from "../styles/expenses.module.css";

const Expenses = () => {
  const { data: expenseCategories } = useQuery({
    queryKey: ["expense_categories"],
    queryFn: async () => {
      const response = await axiosInstance.get("expense_categories");

      return response.data as { id: number; category: string }[];
    },
  });

  const { data: expenses, isPending: expensePending } = useQuery({
    queryKey: ["expenses"],
    queryFn: async () => {
      const response = await axiosInstance.get("expense/list");

      return response.data as Promise<Expense[]>;
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateExpenseInputs>();

  const { mutate, isPending } = useCreateExpense();

  return (
    <div>
      <h2>Expenses</h2>
      <form
        className={styles.createExpenseForm}
        onSubmit={handleSubmit((data) => {
          data.date_added = new Date(
            data.date_added.toLocaleString() + "T00:00:00Z"
          );
          mutate(data);
          reset();
        })}
      >
        <select
          {...register("category_id", {
            required: "Category is required.",
            valueAsNumber: true,
          })}
        >
          <option value={""}>Select Category</option>
          {expenseCategories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        <p>{errors.category_id?.message}</p>
        <input
          {...register("description", { required: "Description is required." })}
          placeholder="Description"
        ></input>
        <p>{errors.description?.message}</p>
        <input
          {...register("amount", { required: "Amount is required." })}
          placeholder="Amount"
        ></input>
        <p>{errors.amount?.message}</p>
        <input
          {...register("date_added", { required: "Date is required." })}
          type="date"
        ></input>
        <p>{errors.date_added?.message}</p>
        <input type="submit" value="Submit" />
      </form>
      {isPending && <p>Creating Expense...</p>}
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expensePending && (
            <tr>
              <td colSpan={4}>Pending</td>
            </tr>
          )}
          {expenses?.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.category}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.date_added.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
