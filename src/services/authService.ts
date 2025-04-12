import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL
if (!BASE_URL) {
  throw new Error("VITE_BASE_URL is not defined");
}
console.log(BASE_URL);
const API_BASE_URL = `${BASE_URL}/api/v1/user`;

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const register = async (email: string, username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/register`, {
    email,
    username,
    password,
  });
  return response.data;
}