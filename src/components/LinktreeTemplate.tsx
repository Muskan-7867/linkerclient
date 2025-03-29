import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deletelinktree } from "../services/deletelinktree";
import { editLinktree } from "../services/editlinktree";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaSave, FaTrash, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import * as FaIcons from "react-icons/fa";
import axios from "axios";

interface Link {
  title: string;
  icon?: string;
  url: string;
}

const DynamicIcon = ({ iconName }: { iconName?: string }) => {
  if (!iconName || !(iconName in FaIcons)) {
    return <span className="text-xl">🔗</span>;
  }
  const IconComponent = FaIcons[iconName as keyof typeof FaIcons];
  return <IconComponent className="text-xl text-blue-500" />;
};

const LinktreeTemplate: React.FC = () => {
  const { linktreeId } = useParams();
  const navigate = useNavigate();
  const [treeId, setTreeId] = useState<string>("");
  const [treeName, setTreeName] = useState<string>("Untitled Linktree");
  const [links, setLinks] = useState<Link[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [linktreeUrl, setLinktreeUrl] = useState<string>("");

  useEffect(() => {
    const storedTreeId = localStorage.getItem("treeId");
    const storedTreeName = localStorage.getItem("treeName");
    const storedLinks = localStorage.getItem("links");
    const storedLinktreeUrl = localStorage.getItem("linktreeUrl");

    console.log("LocalStorage Data:", {
      storedTreeId,
      storedTreeName,
      storedLinks,
      storedLinktreeUrl,
    });

    if (storedTreeId) setTreeId(storedTreeId);
    if (storedTreeName) setTreeName(storedTreeName);
    if (storedLinks) setLinks(JSON.parse(storedLinks));
    if (storedLinktreeUrl) setLinktreeUrl(storedLinktreeUrl);
  }, []);

  useEffect(() => {
    
    
    const BACKEND_URL = "http://localhost:8083";
    const fetchLinktree = async () => {
      if (!linktreeId) return;

      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/link/linktree/${linktreeId}`);
        console.log("Fetched Linktree Data:", response);
        
        const { treeName, links, url } = response.data;

        setTreeId(linktreeId); // Fix: Use linktreeId instead of treeId
        setTreeName(treeName);
        setLinks(links);
        setLinktreeUrl(url);
      } catch (error) {
        console.error("Error fetching Linktree:", error);
      }
    };

    fetchLinktree();
  }, [linktreeId]); // Fix: Add dependency to prevent infinite loop

  const handleEdit = async () => {
    try {
      const data = { id: treeId, treeName, links };
      await editLinktree(data);

      // localStorage.setItem("treeId", treeId);   bkwas
      // localStorage.setItem("treeName", treeName);
      // localStorage.setItem("links", JSON.stringify(links));

      alert("✅ Linktree updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating Linktree:", error);
      alert("❌ Failed to update Linktree. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletelinktree(treeId);
      navigate('/');

      localStorage.removeItem("treeId");
      localStorage.removeItem("treeName");
      localStorage.removeItem("links");

      setTreeId("");
      setTreeName("Untitled Linktree");
      setLinks([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting Linktree:", error);
      alert("❌ Failed to delete Linktree.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full bg-white backdrop-blur-md shadow-2xl rounded-2xl p-6"
      >
        {isEditing ? (
          <>
            <input
              type="text"
              value={treeId}
              onChange={(e) => setTreeId(e.target.value)}
              className="text-lg font-bold text-center text-black border-b pb-2 mb-4 bg-transparent w-full outline-none"
              placeholder="Enter Tree ID"
            />
            <input
              type="text"
              value={treeName}
              onChange={(e) => setTreeName(e.target.value)}
              className="text-3xl font-bold text-center text-black bg-transparent w-full outline-none border-b focus:ring-2 focus:ring-white"
              placeholder="Enter Tree Name"
            />
          </>
        ) : (
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-center border-b pb-2 "
          >
            {treeName}
          </motion.h2>
        )}

        {/* Display Linktree URL */}
        {linktreeUrl && (
          <div className="flex items-center justify-between bg-gray-200 px-4 py-2 rounded-lg mt-12">
            <span className="text-gray-700  truncate">{linktreeUrl}</span>
            <div className="flex space-x-2">
              <FaCopy
                className="text-gray-600 cursor-pointer hover:text-black"
                onClick={() => {
                  navigator.clipboard.writeText(linktreeUrl);
                  alert("📋 Link copied to clipboard!");
                }}
              />
              <a href={`/linktree/${treeId}`} target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt className="text-blue-500 cursor-pointer hover:text-blue-700" />
              </a>
            </div>
          </div>
        )}

        {/* Display Links */}
        <div className="mt-6 space-y-4">
          {links.length > 0 ? (
            links.map((link, index) => (
              <motion.div
                key={index}
                className="p-4 bg-white bg-opacity-20 rounded-xl shadow-lg flex items-center transition hover:scale-105 hover:shadow-xl"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mr-4">
                  <DynamicIcon iconName={link.icon} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black">{link.title}</h3>
                  <p className="text-blue-400 break-all">{link.url}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p className="text-white text-center">No links available</motion.p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6 space-x-4">
          {isEditing ? (
            <FaSave onClick={handleEdit} className="text-green-500 text-2xl cursor-pointer hover:text-blue-700" />
          ) : (
            <FaEdit onClick={() => setIsEditing(true)} className="text-orange-500 text-2xl cursor-pointer hover:text-blue-700" />
          )}
          <FaTrash onClick={() => setShowDeleteConfirmation(true)} className="text-red-500 text-2xl cursor-pointer hover:text-red-700" />
        </div>
        {showDeleteConfirmation && (
          <div className="text-center mt-4">
            <p className="text-red-500">Are you sure you want to delete?</p>
            <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded-lg mt-2">Confirm Delete</button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LinktreeTemplate;
