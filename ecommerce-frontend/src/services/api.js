// src/services/api.js
import axios from 'axios';

// Replace with your Django API URL
const API_URL = "http://localhost:8000/api/";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}login/`, { username, password });
    return response.data.token;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
};

export const fetchProducts = async (token) => {
  try {
    const response = await axios.get(`${API_URL}products/`, {
      headers: { Authorization: `Token ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products", error);
    throw error;
  }
};
