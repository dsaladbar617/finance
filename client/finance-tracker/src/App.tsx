import { Route } from "wouter";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/profile/:username" component={Profile} />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
