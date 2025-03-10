import React from "react";
import {  useNavigate } from "react-router-dom";

const Templates: React.FC = () => {
  const navigate = useNavigate();

  const templates = [
    { id: 1, name: "", image: "./images/lightTheme.png" },
    { id: 2, name: "", image: "./images/DarkTheme.png" },
  ];

  const handleSelectTemplate = (template: { id: number; name: string }) => {
    localStorage.setItem("selectedTheme", template.name);
    navigate(`/templates/${template.id}`);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="mt-20 text-white text-3xl font-bold text-center mb-12">
        Choose Your Template
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={template.image}
              alt={template.name}
              className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => handleSelectTemplate(template)}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Start with {template.name}
              </button>
            </div>
            <div className="p-4 bg-gray-800">
              <h3 className="text-white text-lg font-semibold">{template.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
