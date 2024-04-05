import { Route } from "wouter";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  return (
    <>
      <Header />
      <main>
        <Route path="/" component={Home} />
        <Route path="/yo" component={() => <div>Yo</div>} />
      </main>
    </>
  );
}

export default App;
