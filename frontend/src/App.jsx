import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Items from './pages/Items';
import Delivery from './pages/Delivery';
import Payment from './pages/Payment';

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <Link to="/" className="logo">Grocery Delivery</Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/signup">Sign Up</Link>
              <Link to="/items">Items</Link>
              <Link to="/delivery">Delivery</Link>
              <Link to="/payment">Payment</Link>
            </div>
          </nav>
        </header>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/items" component={Items} />
            <Route path="/delivery" component={Delivery} />
            <Route path="/payment" component={Payment} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;