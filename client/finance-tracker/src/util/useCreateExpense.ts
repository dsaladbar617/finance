import { useMutation } from "@tanstack/react-query";
import { CreateExpenseInputs } from "../types/expense";
import { axiosInstance } from "./axios";
import { queryClient } from "../util/queryClient";

// React mutation to create an expense. Will invalidate current expenses data used to populate expense table.
export const useCreateExpense = () => {
  return useMutation({
    mutationFn: async (data: CreateExpenseInputs) => {
      const response = await axiosInstance.post("expense/create", data);

      return response;
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
