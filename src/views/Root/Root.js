import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../../components/Header/Header";
import HomeView from "../HomeView/HomeView";
import FavoriteView from "../FavoriteView/FavoriteView";
import "./index.css";

class Root extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/favorite" component={FavoriteView} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
