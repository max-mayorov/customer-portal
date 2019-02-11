import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import Queue from "./Queue"
import NewReport from "./NewReport"

const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router basename={'/portal'}>
    <div>
        <header className="App-header">
            <nav className="nav">
                <ul>
                    <li>
                    <Link to={`/`}>Home</Link>
                    </li>
                    <li>
                    <Link to={`/new/`}>New report</Link>
                    </li>
                    <li>
                    <Link to={`/users/`}>Users</Link>
                    </li>
                    <li>
                    <LogoutButton />
                    </li>
                </ul>
            </nav>
        </header>
        <div>
            <Route path={`/`} exact component={Queue} />
            <Route path={`/new/`} exact component={NewReport} />
            <Route path={`/new/:provider`} exact component={NewReport} />
            <Route path={`/new/:provider/:report`} exact component={NewReport} />
            <Route path={`/users/`} component={Users} />
            <Route path={`/queue`} exact component={Queue} />
            <Route path={`/queue/:provider`} exact component={Queue} />
            <Route path={`/queue/:provider/:report`} exact component={Queue} />

        </div>
    </div>
  </Router>
);

export default AppRouter;