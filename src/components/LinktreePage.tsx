import React, { useEffect, useState } from "react";

import * as FaIcons from "react-icons/fa"; 

interface Link {
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
  return <IconComponent className="text-xl text-white mr-2" />;
};

const LinktreePage: React.FC = () => {
  
  const [treeName, setTreeName] = useState<string>("My Linktree");
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const storedTreeName = localStorage.getItem("treeName");
    const storedLinks = localStorage.getItem("links");

    if (storedTreeName) setTreeName(storedTreeName);
    if (storedLinks) setLinks(JSON.parse(storedLinks));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center">{treeName}</h2>
        <div className="mt-6 space-y-4">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center bg-green-500 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              <DynamicIcon iconName={link.icon} />
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinktreePage;
