import { hot } from "react-hot-loader";
import React from 'react';
import './App.scss';


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import HeaderMenu from './components/HeaderMenu';
import Footer from './components/Footer';

import Home from './pages/Home';
import Resume from './pages/Resume';
import Blog from './pages/Blog';

interface PropType {
  page?: number,
};

const App = ({ page = 0 }: PropType) => {

  React.useEffect(() => {

  });

  return (
    <Router>
      <HeaderMenu />
      <Switch>
        <Route path='/resume'>
          <Resume />
        </Route>
        <Route path='/blog'>
          <Blog />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default hot(module)(App);
