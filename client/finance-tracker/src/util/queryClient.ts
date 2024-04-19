import { QueryClient } from "@tanstack/react-query";

// Create queryClient to be used in App.tsx and to invalidate query in Expenses.tsx
export const queryClient = new QueryClient();
