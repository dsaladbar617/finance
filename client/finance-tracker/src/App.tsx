import { Route } from "wouter";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <main>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/home" component={Home} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
