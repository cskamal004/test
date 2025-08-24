import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Grocery Delivery App</h1>
            <div className="home-nav">
              <nav>
                <ul>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/items">Browse Items</Link></li>
                    <li><Link to="/delivery">Select Delivery Slot</Link></li>
                    <li><Link to="/payment">Make Payment</Link></li>
                </ul>
              </nav>
            </div>
            <p>Navigate through the app using the links above!</p>
        </div>
    );
};

export default Home;