import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import { QueryClientProvider } from "@tanstack/react-query";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import Profile from "./components/Profile";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import Expenses from "./components/Expenses";
import { queryClient } from "./util/queryClient";

function App() {
  // State to manage if the sidebar is closed or not.
  const [isClosed, setIsClosed] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Sidebar isClosed={isClosed} setIsClosed={setIsClosed} />
        <div className="headerPageContainer">
          <Header />
          <main className={isClosed ? "mainClosed" : "mainOpen"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoutes />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/expenses" element={<Expenses />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
