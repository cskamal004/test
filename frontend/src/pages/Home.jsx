import React from 'react';
import SignupForm from '../components/SignupForm';
import ItemList from '../components/ItemList';
import DeliverySlotSelector from '../components/DeliverySlotSelector';
import PaymentForm from '../components/PaymentForm';

const Home = () => {
    return (
        <div>
            <h1>Welcome to Grocery Delivery App</h1>
            <SignupForm />
            <ItemList />
            <DeliverySlotSelector />
            <PaymentForm />
        </div>
    );
};

export default Home;