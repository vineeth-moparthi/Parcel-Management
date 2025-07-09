import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Spring Boot backend

export const loginUser = async (credentials) => {
  return axios.post(`${BASE_URL}/login`, credentials);
};

export const registerUser = async (credentials) => {
  return axios.post(`${BASE_URL}/registration`, credentials);
};