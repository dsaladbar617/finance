import { Route } from "wouter";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const accessToken = Boolean(localStorage.getItem("accessToken"));
  const [isAuth, setIsAuth] = useState(accessToken);
  // const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    if (accessToken) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [accessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Header isAuth={isAuth} setIsAuth={setIsAuth} />
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
