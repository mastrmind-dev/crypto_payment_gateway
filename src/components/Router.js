import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App.js";

function Router() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
      {console.log("executed")}
          <Route
            path="/"
            component={<App/>}
            element={<App/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Router;
