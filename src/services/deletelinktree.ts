import axios from 'axios';

export const deletelinktree = async (id: string) => {
  if (!id) {
    throw new Error("Linktree id is required");
  }
  try {
    const response = await axios.delete(`http://localhost:8000/api/v1/link/delete/${id}`);
    return response.data; // This should contain the success message from the backend
  } catch (error) {
    console.error("Error in deletelinktree API:", error);
    throw error;
  }
};