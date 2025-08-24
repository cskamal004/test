import React, { useState, useEffect } from "react";
import { fetchDeliverySlots } from "../services/api";

const DeliverySlotSelector = ({ onSlotSelected, selectedSlot }) => {
  const [slots, setSlots] = useState([]);
  const [currentSelectedSlot, setCurrentSelectedSlot] = useState(selectedSlot || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getSlots = async () => {
      try {
        const data = await fetchDeliverySlots();
        setSlots(data);
      } catch (e) {
        setError(e.message || "Error fetching delivery slots");
      } finally {
        setLoading(false);
      }
    };
    getSlots();
  }, []);

  const handleSlotChange = (event) => {
    const slotId = event.target.value;
    setCurrentSelectedSlot(slotId);
    const selectedSlotData = slots.find(slot => slot._id === slotId);
    if (onSlotSelected && selectedSlotData) {
      onSlotSelected(selectedSlotData);
    }
  };

  const handleContinue = () => {
    if (!currentSelectedSlot) {
      alert("Please select a delivery slot to continue.");
      return;
    }
    const selectedSlotData = slots.find(slot => slot._id === currentSelectedSlot);
    if (onSlotSelected && selectedSlotData) {
      onSlotSelected(selectedSlotData);
    }
  };

  if (loading) return <div className="loading">Loading delivery slots...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="delivery-slot-container">
      <div className="slot-selection">
        <label htmlFor="slot-select">Select Delivery Slot:</label>
        <select 
          id="slot-select" 
          value={currentSelectedSlot} 
          onChange={handleSlotChange}
          className="slot-select"
        >
          <option value="" disabled>
            Choose a slot
          </option>
          {slots.map((slot) => (
            <option key={slot._id} value={slot._id}>
              {new Date(slot.date).toLocaleDateString()} - {slot.time}
            </option>
          ))}
        </select>
      </div>

      {currentSelectedSlot && (
        <div className="selected-slot-info">
          <h4>Selected Delivery Slot:</h4>
          <p>
            {slots.find(slot => slot._id === currentSelectedSlot) && 
             `${new Date(slots.find(slot => slot._id === currentSelectedSlot).date).toLocaleDateString()} - ${slots.find(slot => slot._id === currentSelectedSlot).time}`
            }
          </p>
          <button className="continue-btn" onClick={handleContinue}>
            Continue to Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliverySlotSelector;