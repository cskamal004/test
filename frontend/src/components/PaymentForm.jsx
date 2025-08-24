import React, { useState } from "react";
import { processPayment } from "../services/api";

const PaymentForm = ({ amount, userId, onPaymentSuccess }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!cardNumber || !expiryDate || !cvv) {
      setError("Please fill in all payment fields");
      setSuccess("");
      setLoading(false);
      return;
    }

    // Basic validation
    if (cardNumber.length < 16) {
      setError("Card number must be at least 16 digits");
      setLoading(false);
      return;
    }

    if (cvv.length < 3) {
      setError("CVV must be at least 3 digits");
      setLoading(false);
      return;
    }

    try {
      await processPayment({ 
        amount: parseFloat(amount), 
        paymentMethod: "credit_card", 
        userId: userId || "507f1f77bcf86cd799439011"
      });
      setSuccess("Payment processed successfully!");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setError("");
      
      setTimeout(() => {
        if (onPaymentSuccess) {
          onPaymentSuccess();
        }
      }, 2000);
    } catch (e) {
      setError(e.message || "Payment failed");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-form-container">
      <form onSubmit={handleSubmit} className="payment-form">
        <h3>Payment Details</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        
        <div className="amount-display">
          <h4>Amount to Pay: ${amount ? amount.toFixed(2) : '0.00'}</h4>
        </div>

        <div className="form-group">
          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
              placeholder="1234 5678 9012 3456"
              disabled={loading}
            />
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              Expiry Date (MM/YY):
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, '');
                  if (value.length >= 2) {
                    value = value.slice(0, 2) + '/' + value.slice(2, 4);
                  }
                  setExpiryDate(value);
                }}
                placeholder="MM/YY"
                maxLength={5}
                disabled={loading}
              />
            </label>
          </div>

          <div className="form-group">
            <label>
              CVV:
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="123"
                disabled={loading}
              />
            </label>
          </div>
        </div>

        <button type="submit" disabled={loading} className="pay-button">
          {loading ? 'Processing...' : `Pay $${amount ? amount.toFixed(2) : '0.00'}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;