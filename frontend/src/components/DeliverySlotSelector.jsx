import React, { useState, useEffect } from "react";
import { fetchDeliverySlots } from "../services/api";

const DeliverySlotSelector = ({ onSlotSelect }) => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
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
    setSelectedSlot(event.target.value);
    onSlotSelect(event.target.value);
  };

  if (loading) return <p>Loading delivery slots...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <label htmlFor="slot-select">Select Delivery Slot:</label>
      <select id="slot-select" value={selectedSlot} onChange={handleSlotChange}>
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
  );
};

export default DeliverySlotSelector;
