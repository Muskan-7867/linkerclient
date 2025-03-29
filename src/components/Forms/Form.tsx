import React from "react";
import { useNavigate } from "react-router-dom";
import TitleDropdown from "../dropdowns/titledropdown";
import IconDropdown from "../dropdowns/icondropdown";
import axios, { AxiosError } from "axios"; 

interface Link {
  id: string;
  title: string;
  icon: JSX.Element | null;
  link: string;
}

interface FormProps {
  treeName: string;
  links: Link[];
  setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
  setTreeName: React.Dispatch<React.SetStateAction<string>>; 
}

const Form: React.FC<FormProps> = ({ treeName, links, setLinks, setTreeName }) => {
  
  const navigate = useNavigate();
  
  
 
  const BACKEND_URL =  import.meta.env.BACKEND_URL || "http://localhost:8083";
 

  console.log("BACKEND_URL:",BACKEND_URL );  

  const handleAddLink = () => {
    setLinks([...links, { id: crypto.randomUUID(), title: "", icon: null, link: "" }]);
  };

  const handleLinkChange = <K extends keyof Link>(index: number, key: K, value: Link[K]) => {
    const updatedLinks = [...links];
    updatedLinks[index] = { ...updatedLinks[index], [key]: value };
    setLinks(updatedLinks);
  };

  const handleCreateLinktree = async () => {
    if (!treeName.trim()) {
      alert("Please enter a tree name.");
      return;
    }
  
    for (const link of links) {
      if (!link.title.trim() || !link.link.trim()) {
        alert("Please fill out all link fields.");
        return;
      }
    }
  
    try {
      const payload = {
        treeName,
        links: links.map((link) => ({
          title: link.title,
          icon: link.icon ? "🔗" : null,
          url: link.link,
        })),
      };
  
      console.log("Payload being sent:", payload);
  
      const response = await axios.post(`${BACKEND_URL}/api/v1/link/create`, payload);
      console.log("Response:", response.data);
  
      if (!response.data || !response.data.link) {
        throw new Error("Invalid response from server");
      }

      // Save to localStorage
      localStorage.setItem("treeId", response.data.link._id);
      localStorage.setItem("treeName", treeName);
      localStorage.setItem("links", JSON.stringify(payload.links));
      localStorage.setItem("linktreeUrl", response.data.url);
    
      navigate("/linktree-template");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("Axios Error creating Linktree:", error.response?.data || error.message);
      } else {
        console.error("Error creating Linktree:", error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Manage Links</h2>
      <div className="space-y-6">
        {/* Tree Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tree Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Enter your Linktree name"
            value={treeName}
            onChange={(e) => setTreeName(e.target.value)}
          />
        </div>

        {/* Links Input */}
        {links.map((link, index) => (
          <div key={link.id} className="space-y-4 border-b pb-4">
            {/* Title Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <TitleDropdown
                selectedTitle={link.title}
                onTitleSelect={(title) => handleLinkChange(index, "title", title)}
              />
            </div>

            {/* Icon Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon</label>
              <IconDropdown
                selectedIcon={link.icon ? { name: link.title, icon: link.icon } : null}
                onIconSelect={(iconObj) => handleLinkChange(index, "icon", iconObj.icon)}
              />
            </div>

            {/* Link Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Link</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter link"
                value={link.link}
                onChange={(e) => handleLinkChange(index, "link", e.target.value)}
              />
            </div>
          </div>
        ))}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={handleAddLink}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Add More Links
          </button>
          <button
            type="button"
            onClick={handleCreateLinktree}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Create Linktree
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
