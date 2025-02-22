

import axios from "axios";

export const editLinktree = async (data: { id: string; treeName: string; links: { title: string; url: string; icon?: string }[] }) => {
  try {
    const response = await axios.put("http://localhost:8000/api/v1/link/edit", data, {
      headers: { "Content-Type": "application/json" }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error in editLinktree API:", error);
    throw error;
  }
};
