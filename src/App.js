import React, { Component } from 'react'
import { BrowserRouter, Switch, Route} from "react-router-dom";

import { ComNavbar } from './components/Index';
import { Home, Sukses } from './pages/Index';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ComNavbar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/sukses" component={Sukses} />
          </Switch>
        </main>

      </BrowserRouter>
    )
  }
}
