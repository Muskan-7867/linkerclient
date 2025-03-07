import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import LightTemplate from "../pages/Template/LightTemplate";
import DarkTemplate from "../pages/Template/DarkTemplate";

interface Link {
  id: string;
  title: string;
  icon?: string;
  url: string;
}

// Dynamic Icon Component
const DynamicIcon = ({ iconName }: { iconName?: string }) => {
  if (!iconName || !(iconName in FaIcons)) {
    return <span className="text-xl">🔗</span>;
  }

  const IconComponent = FaIcons[iconName as keyof typeof FaIcons];
  return <IconComponent className="text-xl text-gray-700 mr-2" />;
};

const LinktreePage: React.FC = () => {
  const [treeName, setTreeName] = useState<string>("My Linktree");
  const [links, setLinks] = useState<Link[]>([]);
  const [theme, setTheme] = useState<string>("light"); // Default theme

  useEffect(() => {
    const storedTreeName = localStorage.getItem("treeName");
    const storedLinks = localStorage.getItem("links");
    const storedTheme = localStorage.getItem("selectedTheme"); 

    if (storedTreeName) setTreeName(storedTreeName);
    if (storedLinks) setLinks(JSON.parse(storedLinks));
    if (storedTheme) {
      setTheme(storedTheme === "Dark Theme" ? "dark" : "light"); 
    }
  }, []);

  // Profile Info
  const profileInfo = {
    name: treeName,
    info: "Welcome to my link collection!",
    image: "",
  };

  // Convert links to Template format
  const formattedLinks = links.map((link) => ({
    id: link.id, // Ensure this exists
    title: link.title,
    icon: link.icon ? <DynamicIcon iconName={link.icon} /> : null,
    link: link.url,
  }));
  

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <div className="w-full max-w-lg">
        {theme === "light" ? (
          <LightTemplate profileInfo={profileInfo} links={formattedLinks} />
        ) : (
          <DarkTemplate profileInfo={profileInfo} links={formattedLinks} />
        )}
      </div>
    </div>
  );
};

export default LinktreePage;
