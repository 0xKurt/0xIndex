import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Overview from "./components/Overview";
import Header from "./components/Header";
import ContextProvider from "./other/ContextProvider";
// import App.css
import "./App.css";

function App() {
  return (
    <div
      style={{ backgroundColor: "#222222", color: "#fff", minHeight: "100vh" }}
    >
      <ContextProvider>
        <Router>
          <NavBar />
          <Header />
          <Switch>
            <div
              className="app-container"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Overview />
              </Route>
              <Route path="/:chain/">
                <Overview />
              </Route>
              <Route path="/:chain/:category">
                <Overview />
              </Route>
            </div>
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
