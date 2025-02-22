import axios from "axios";

interface Link {
  title: string;
  icon: JSX.Element | null;
  link: string;
}

export const handleCreateLinktree = async (treeName: string, links: Link[]) => {
  if (!treeName) {
    alert("Please enter a name for your Linktree.");
    return;
  }

  try {
    for (const link of links) {
      if (!link.title || !link.link || !link.icon) {
        alert("Each link must have a title, icon, and URL.");
        return;
      }
    }

    const payload = {
      treeName,
      links: links.map((link) => ({
        title: link.title,
        icon: link.icon,  
        url: link.link,
      })),
    };

    const response = await axios.post("http://localhost:8000/api/v1/link/create", payload);

    console.log("Linktree created successfully:", response.data);
    alert("Linktree created successfully!");

    // Save only serializable data
    localStorage.setItem("userLinktreeData", JSON.stringify({
      treeName: response.data.treeName,
      links: response.data.links,
      createdAt: new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error creating Linktree:", error);
    alert("Failed to create Linktree. Please try again.");
  }
};
