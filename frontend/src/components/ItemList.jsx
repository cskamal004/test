import React, { useEffect, useState } from "react";
import { fetchItems } from "../services/api";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading items...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {items.length === 0 ? (
        <li>No items available.</li>
      ) : (
        items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.price}
          </li>
        ))
      )}
    </ul>
  );
};

export default ItemList;
