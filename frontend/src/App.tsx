import "./App.css";
import TaskManagerPage from "./Components/TaskManagerPage";
import LoginPage from "./Components/LoginPage";
import { useState } from "react";
// import Header from "./Components/Header";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="app">
      <div className="background" />
      {loggedIn ? <TaskManagerPage /> : <LoginPage setLoggedIn={setLoggedIn} />}
    </div>
  );
};

export default App;
