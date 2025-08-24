import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // API responded with error data
    } else {
      throw { message: error.message || "Unknown error" }; // Network or other error
    }
  }
};

export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // API responded with error data
    } else {
      throw { message: error.message || "Unknown error" }; // Network or other error
    }
  }
};

export const fetchDeliverySlots = async () => {
  try {
    const response = await axios.get(`${API_URL}/delivery-slots`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // API responded with error data
    } else {
      throw { message: error.message || "Unknown error" }; // Network or other error
    }
  }
};

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/payment`, paymentData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data; // API responded with error data
    } else {
      throw { message: error.message || "Unknown error" }; // Network or other error
    }
  }
};
