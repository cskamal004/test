import React, { useEffect, useState } from "react";
import { fetchItems } from "../services/api";

const ItemList = ({ onItemsSelected, selectedItems = [] }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchItemList = async () => {
      try {
        const data = await fetchItems();
        setItems(data);
      } catch (e) {
        setError(e.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    };
    fetchItemList();
  }, []);

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem._id === item._id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item._id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item._id === itemId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleContinue = () => {
    if (cart.length === 0) {
      alert("Please select at least one item to continue.");
      return;
    }
    if (onItemsSelected) {
      onItemsSelected(cart, getTotalAmount());
    }
  };

  if (loading) return <div className="loading">Loading items...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="item-list-container">
      <div className="items-grid">
        {items.length === 0 ? (
          <p>No items available.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="item-card">
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
                <p className="item-stock">Stock: {item.quantity}</p>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(item)}
                disabled={item.quantity === 0}
              >
                {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-section">
          <h3>Your Cart</h3>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item">
                <span className="cart-item-name">{item.name}</span>
                <div className="cart-item-controls">
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  className="remove-item-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${getTotalAmount().toFixed(2)}</strong>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            Continue to Delivery
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;