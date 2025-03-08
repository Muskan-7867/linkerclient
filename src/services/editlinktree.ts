

import axios from "axios";

export const editLinktree = async (data: { id: string; treeName: string; links: { title: string; url: string; icon?: string }[] }) => {
  const isProduction = import.meta.env.PROD; // Vite-specific

const BACKEND_URL = isProduction
  ? process.env.VITE_BACKEND_URL
  : "http://localhost:8000";
  try {
    const response = await axios.put(`${BACKEND_URL}/api/v1/link/edit`, data, {
      headers: { "Content-Type": "application/json" }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error in editLinktree API:", error);
    throw error;
  }
};
