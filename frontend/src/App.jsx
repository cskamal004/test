import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Items from './pages/Items';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/items" component={Items} />
        <Route path="/delivery" component={Delivery} />
        <Route path="/payment" component={Payment} />
      </Switch>
    </Router>
  );
};

export default App;