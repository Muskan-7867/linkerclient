import { useState } from "react";
import {
  FaInstagram, FaTwitter, FaFacebook, FaLinkedin, FaYoutube, FaPinterest,
  FaSnapchat, FaTiktok, FaReddit, FaWhatsapp, FaPlus
} from "react-icons/fa";

interface IconDropdownProps {
  selectedIcon: { name: string; icon: JSX.Element } | null; // Updated to store the entire icon object
  onIconSelect: (icon: { name: string; icon: JSX.Element }) => void; // Updated to pass the entire icon object
}

const IconDropdown: React.FC<IconDropdownProps> = ({ selectedIcon, onIconSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const icons = [
    { name: "Instagram", icon: <FaInstagram /> },
    { name: "Twitter", icon: <FaTwitter /> },
    { name: "Facebook", icon: <FaFacebook /> },
    { name: "LinkedIn", icon: <FaLinkedin /> },
    { name: "YouTube", icon: <FaYoutube /> },
    { name: "Pinterest", icon: <FaPinterest /> },
    { name: "Snapchat", icon: <FaSnapchat /> },
    { name: "TikTok", icon: <FaTiktok /> },
    { name: "Reddit", icon: <FaReddit /> },
    { name: "WhatsApp", icon: <FaWhatsapp /> },
  ];

  return (
    <div className="relative">
      <div
        className="flex items-center cursor-pointer border border-black rounded-lg px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {/* Show selected icon */}
        <span className="flex-grow flex items-center gap-2">
          {selectedIcon ? (
            <>
              {selectedIcon.icon} <span>{selectedIcon.name}</span>
            </>
          ) : (
            "Select Icon"
          )}
        </span>
        <FaPlus />
      </div>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded-lg shadow-lg z-10">
          {icons.map((icon, i) => (
            <div
              key={i}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => {
                onIconSelect(icon); // Pass the entire icon object
                setIsOpen(false);
              }}
            >
              {icon.icon} <span>{icon.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IconDropdown;