import axios from "axios";

interface Link {
  title: string;
  icon: string; // Store icon name as a string (e.g., "FaHome")
  url: string;
}

export const handleCreateLinktree = async (treeName: string, links: Link[], setLinktreeUrl: (url: string) => void) => {
  if (!treeName) {
    alert("Please enter a name for your Linktree.");
    return;
  }

  // Validate links before making API request
  for (const link of links) {
    if (!link.title || !link.url || !link.icon) {
      alert("Each link must have a title, icon, and URL.");
      return;
    }
  }

  try {
    const payload = {
      treeName,
      links, // Already structured correctly
    };

    const response = await axios.post("http://localhost:8000/api/v1/link/create", payload);

    console.log("Linktree created successfully:", response.data);
    
    if (response.data?.link?._id) { 
      const linktreeId = response.data.link._id;
      const linktreeUrl = `http://localhost:8000/api/v1/link/linktree/${linktreeId}`;

      console.log("Generated Linktree URL:", linktreeUrl);

      // Store correct URL in localStorage
      localStorage.setItem("linktreeUrl", linktreeUrl);

      // Update state in React component
      setLinktreeUrl(linktreeUrl);
    }
  } catch (error) {
    console.error("Error creating Linktree:", error);
    alert(error.response?.data?.message || "Failed to create Linktree. Please try again.");
  }
};
