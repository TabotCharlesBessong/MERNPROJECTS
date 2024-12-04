import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import Challenges from "./Challenges";

import { Route,BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Dashboard</h1>
      </header>
      <div className="App-body">
        <span>
          <LoginButton />
          <LogoutButton />
        </span>
        <Router>
          <Switch>
            <Route path="/challenges" Component={Challenges} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
