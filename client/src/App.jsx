import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NewReleasesView from "./views/newreleases";
import PopularSongsView from "./views/popularSongs";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <img
        src="../spotify-logo.png"
        alt="website logo"
        width="170px"
        height="50px"
        className="ml-5 mt-5"
      />
      <Router>
        <Container>
          <Switch>
            <Route path="/" exact component={NewReleasesView} />
            <Route path="/newreleases" component={NewReleasesView} />
            <Route path="/artist/:id" exact component={PopularSongsView} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
}

export default App;
