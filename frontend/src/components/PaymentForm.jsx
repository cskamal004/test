import React, { useState } from "react";
import { processPayment } from "../services/api";

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiryDate || !cvv || !amount) {
      setError("Please fill in all fields");
      setSuccess("");
      return;
    }
    try {
      await processPayment({ 
        amount: parseFloat(amount), 
        paymentMethod: "credit_card", 
        userId: "507f1f77bcf86cd799439011" // Using a valid MongoDB ObjectId format
      });
      setSuccess("Payment processed successfully!");
      setCardNumber("");
      setExpiryDate("");
      setCvv("");
      setAmount("");
      setError("");
    } catch (e) {
      setError(e.message || "Payment failed");
      setSuccess("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Payment Details</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <div>
        <label>
          Amount:
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
          />
        </label>
      </div>
      <div>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={16}
            placeholder="1234 5678 9012 3456"
          />
        </label>
      </div>
      <div>
        <label>
          Expiry Date (MM/YY):
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            maxLength={5}
          />
        </label>
      </div>
      <div>
        <label>
          CVV:
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            maxLength={4}
            placeholder="123"
          />
        </label>
      </div>
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;
