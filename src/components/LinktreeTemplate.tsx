import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { deletelinktree } from "../services/deletelinktree";
import { editLinktree } from "../services/editlinktree";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaTrash } from "react-icons/fa";
import * as FaIcons from "react-icons/fa"; // Import all FontAwesome icons

interface Link {
  title: string;
  icon?: string; // Icon stored as a string (e.g., "FaHome")
  url: string;
}

const DynamicIcon = ({ iconName }: { iconName?: string }) => {
  console.log("Icon Name:", iconName); // Debugging: Log the icon name

  if (!iconName || !(iconName in FaIcons)) {
    console.log("Icon not found, using fallback icon"); // Debugging: Log when fallback is used
    return <span className="text-xl">🔗</span>;
  }

  const IconComponent = FaIcons[iconName as keyof typeof FaIcons];
  return <IconComponent className="text-xl text-blue-500" />;
};

const LinktreeTemplate: React.FC = () => {
  const navigate = useNavigate();
  const [treeId, setTreeId] = useState<string>("");
  const [treeName, setTreeName] = useState<string>("Untitled Linktree");
  const [links, setLinks] = useState<Link[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteMessage, setDeleteMessage] = useState<string>("");
  const [deleteError, setDeleteError] = useState<string>("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<boolean>(false);
  const [deleteTreeIdInput, setDeleteTreeIdInput] = useState<string>("");

  useEffect(() => {
    const storedTreeId = localStorage.getItem("treeId");
    const storedTreeName = localStorage.getItem("treeName");
    const storedLinks = localStorage.getItem("links");

    if (storedTreeId) setTreeId(storedTreeId);
    if (storedTreeName) setTreeName(storedTreeName);
    if (storedLinks) setLinks(JSON.parse(storedLinks));
  }, []);

  const handleEdit = async () => {
    try {
      const data = { id: treeId, treeName, links };
      const response = await editLinktree(data);
      console.log("Linktree updated successfully:", response);

      localStorage.setItem("treeId", treeId);
      localStorage.setItem("treeName", treeName);
      localStorage.setItem("links", JSON.stringify(links));

      alert("Linktree updated successfully!");
      setTreeId("");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating Linktree:", error);
      alert("Failed to update Linktree. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirmation) {
      setShowDeleteConfirmation(true);
      return;
    }

    if (deleteTreeIdInput !== treeId) {
      setDeleteError("Tree ID does not match. Please enter the correct Tree ID.");
      return;
    }

    try {
      const result = await deletelinktree(treeId);
      setDeleteMessage(result.message);
      navigate('/');
      setDeleteError("");

      localStorage.removeItem("treeId");
      localStorage.removeItem("treeName");
      localStorage.removeItem("links");
      setTreeId("");
      setTreeName("Untitled Linktree");
      setLinks([]);
      setShowDeleteConfirmation(false);
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
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
            className="text-3xl font-bold text-center border-b pb-2 mb-6"
          >
            {treeName}
          </motion.h2>
        )}

        <div className="mt-6 space-y-4">
          {links.length > 0 ? (
            links.map((link, index) => (
              <motion.div key={index} className="p-4 bg-white bg-opacity-20 rounded-xl shadow-lg flex items-center transition hover:scale-105 hover:shadow-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mr-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={link.icon || ""}
                      onChange={(e) => {
                        const updatedLinks = [...links];
                        updatedLinks[index].icon = e.target.value;
                        setLinks(updatedLinks);
                      }}
                      className="w-12 h-12 flex items-center justify-center bg-white rounded-full text-xl"
                      placeholder="Icon"
                    />
                  ) : (
                    <DynamicIcon iconName={link.icon} />
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={link.title}
                        onChange={(e) => {
                          const updatedLinks = [...links];
                          updatedLinks[index].title = e.target.value;
                          setLinks(updatedLinks);
                        }}
                        className="text-lg font-semibold text-black bg-transparent border-b w-full outline-none"
                        placeholder="Title"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => {
                          const updatedLinks = [...links];
                          updatedLinks[index].url = e.target.value;
                          setLinks(updatedLinks);
                        }}
                        className="text-sm text-blue-400 bg-transparent border-b w-full outline-none mt-2"
                        placeholder="URL"
                      />
                      <input
                        type="text"
                        value={link.icon || ""}
                        onChange={(e) => {
                          const updatedLinks = [...links];
                          updatedLinks[index].icon = e.target.value;
                          setLinks(updatedLinks);
                        }}
                        className="text-sm text-blue-400 bg-transparent border-b w-full outline-none mt-2"
                        placeholder="🔗"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-lg font-semibold text-black">{link.title}</h3>
                      <p className="text-blue-400 break-all">{link.url}</p>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p className="text-white text-center">No links available</motion.p>
          )}
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {isEditing ? (
            <FaSave onClick={handleEdit} className="text-green-500 text-2xl cursor-pointer hover:text-blue-700" />
          ) : (
            <FaEdit onClick={() => setIsEditing(true)} className="text-orange-500 text-2xl cursor-pointer hover:text-blue-700" />
          )}
          <FaTrash onClick={handleDelete} className="text-red-500 text-2xl cursor-pointer hover:text-red-700" />
        </div>

        {deleteMessage && <p className="text-green-500 text-center mt-4">{deleteMessage}</p>}
        {deleteError && <p className="text-red-500 text-center mt-4">{deleteError}</p>}
      </motion.div>
    </div>
  );
};

export default LinktreeTemplate;