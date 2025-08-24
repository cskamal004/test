import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Grocery Delivery App</h1>
            <p>Your one-stop solution for fresh groceries delivered to your doorstep!</p>
            
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
            
            <div className="features">
                <h2>Features</h2>
                <ul>
                    <li>✓ Fresh grocery items</li>
                    <li>✓ Flexible delivery slots</li>
                    <li>✓ Secure payment processing</li>
                    <li>✓ Easy user registration</li>
                </ul>
            </div>
        </div>
    );
};

export default Home;