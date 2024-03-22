import React from "react";

import "./App.css";
import AppRouter from "./routes";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App dark:bg-gray-800 min-h-screen">
      <AppRouter />
    </div>
  );
}

export default App;
