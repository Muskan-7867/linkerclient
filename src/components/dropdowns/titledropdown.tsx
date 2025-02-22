

import React, { useState } from "react";
import { FaPlus } from "react-icons/fa"; 

interface TitleDropdownProps {
  selectedTitle: string;
  onTitleSelect: (title: string) => void;
}

const TitleDropdown: React.FC<TitleDropdownProps> = ({ selectedTitle, onTitleSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const titles = [
    "Instagram",
    "Twitter",
    "Facebook",
    "LinkedIn",
    "YouTube",
    "Pinterest",
    "Snapchat",
    "TikTok",
    "Reddit",
    "WhatsApp",
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer border border-black rounded-lg px-3 py-2"
        onClick={toggleDropdown}
      >
        {/* Display selected title or a default message */}
        <span className="flex-grow">{selectedTitle || "Select Title"}</span>
        {/* Use FaPlus icon to toggle the dropdown */}
        <FaPlus />
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          {titles.map((title, i) => (
            <div
              key={i}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onTitleSelect(title);
                setIsOpen(false); 
              }}
            >
              {title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TitleDropdown;
