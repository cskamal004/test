import React, { useState } from 'react';
import './App.css';
import SignupForm from './components/SignupForm';
import ItemList from './components/ItemList';
import DeliverySlotSelector from './components/DeliverySlotSelector';
import PaymentForm from './components/PaymentForm';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleUserSignup = (userData) => {
    setUser(userData);
    setCurrentStep(2);
  };

  const handleItemsSelected = (items, total) => {
    setSelectedItems(items);
    setTotalAmount(total);
    setCurrentStep(3);
  };

  const handleSlotSelected = (slot) => {
    setSelectedSlot(slot);
    setCurrentStep(4);
  };

  const handlePaymentComplete = () => {
    alert('Order completed successfully!');
    // Reset the flow
    setCurrentStep(1);
    setUser(null);
    setSelectedItems([]);
    setSelectedSlot(null);
    setTotalAmount(0);
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderProgressBar = () => {
    const steps = ['Sign Up', 'Select Items', 'Choose Delivery', 'Payment'];
    return (
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={`progress-step ${index + 1 <= currentStep ? 'active' : ''} ${index + 1 === currentStep ? 'current' : ''}`}
          >
            <div className="step-number">{index + 1}</div>
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1 className="logo">Grocery Delivery</h1>
          {user && <span className="user-welcome">Welcome, {user.username}!</span>}
        </div>
      </header>

      <main>
        {renderProgressBar()}
        
        <div className="step-content">
          {currentStep > 1 && (
            <button className="back-button" onClick={goBack}>
              ← Back
            </button>
          )}

          {currentStep === 1 && (
            <div className="step-container">
              <h2>Welcome to Grocery Delivery</h2>
              <p>Please sign up to start shopping for fresh groceries!</p>
              <SignupForm onSignupSuccess={handleUserSignup} />
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-container">
              <h2>Select Your Items</h2>
              <p>Choose from our fresh selection of grocery items:</p>
              <ItemList 
                onItemsSelected={handleItemsSelected}
                selectedItems={selectedItems}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-container">
              <h2>Choose Delivery Slot</h2>
              <p>Select your preferred delivery time:</p>
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Items: {selectedItems.length}</p>
                <p>Total: ${totalAmount.toFixed(2)}</p>
              </div>
              <DeliverySlotSelector 
                onSlotSelected={handleSlotSelected}
                selectedSlot={selectedSlot}
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-container">
              <h2>Payment</h2>
              <p>Complete your order with secure payment:</p>
              <div className="final-summary">
                <h3>Final Order Summary</h3>
                <p>Items: {selectedItems.length}</p>
                <p>Total: ${totalAmount.toFixed(2)}</p>
                <p>Delivery: {selectedSlot ? `${new Date(selectedSlot.date).toLocaleDateString()} - ${selectedSlot.time}` : 'Not selected'}</p>
              </div>
              <PaymentForm 
                amount={totalAmount}
                userId={user?._id}
                onPaymentSuccess={handlePaymentComplete}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;