import React, { useEffect, useState, useCallback } from "react";
import * as FaIcons from "react-icons/fa";
import LightTemplate from "../pages/Template/LightTemplate";
import DarkTemplate from "../pages/Template/DarkTemplate";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Link {
  id: string;
  title: string;
  icon?: string;
  url: string;
}

interface ApiLink {
  _id: string;
  title: string;
  icon?: string;
  url: string;
}

interface LinktreeData {
  treeName?: string;
  links?: ApiLink[];
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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { treeId } = useParams<{ treeId: string }>();
  
  const theme = "light";  // Set theme directly

  const fetchLinktree = useCallback(async () => {
    if (!treeId) {
      setError("No treeId provided");
      setLoading(false);
      return;
    }

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${BACKEND_URL}/api/v1/link/linktree/${treeId}`);
      const data = response.data;

      const linktreeData: LinktreeData = data.linktree;

      if (linktreeData?.treeName) {
        setTreeName(linktreeData.treeName);
      }

      if (linktreeData?.links && Array.isArray(linktreeData.links)) {
        setLinks(linktreeData.links.map((link: ApiLink) => ({
          id: link._id,
          title: link.title,
          icon: link.icon,
          url: link.url
        })));
      } else {
        setLinks([]);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [treeId]);

  useEffect(() => {
    fetchLinktree();
  }, [treeId, fetchLinktree]);

  const formattedLinks = links?.map((link: Link) => ({
    id: link.id || Math.random().toString(),
    title: link.title || "Untitled Link",
    icon: link.icon ? <DynamicIcon iconName={link.icon} /> : null,
    link: link.url || "#",
  })) || [];

  const profileInfo = {
    name: treeName || "My Linktree",
    info: "Welcome to my link collection!",
    image: "",
  };

  const templateProps = {
    profileInfo,
    links: formattedLinks,
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500">Error: {error}</div>
        <button 
          onClick={fetchLinktree}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-lg">
        {theme === "light" ? (
          <LightTemplate {...templateProps} />
        ) : (
          <DarkTemplate {...templateProps} />
        )}
        {links.length === 0 && (
          <div className="text-center text-gray-500 mt-4">No links available</div>
        )}
      </div>
    </div>
  );
};

export default LinktreePage;