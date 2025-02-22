import React from "react";
import { Link } from "react-router-dom";

const Templates: React.FC = () => {
  const templates = [
    { id: 1, name: "Light Theme", image: "src/assets/lightTheme.png" },
    { id: 2, name: "Dark Theme", image: "src/assets/DarkTheme.png" },
    { id: 1, name: "Light Theme", image: "src/assets/lightTheme.png" },
    { id: 2, name: "Dark Theme", image: "src/assets/DarkTheme.png" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <h1 className="mt-20 text-white text-3xl font-bold text-center mb-12">
        Choose Your Template
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {templates.map((template) => (
          <div
            key={template.id}
            className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Link to={`/templates/${template.id}`} className="block">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                  Start with {template.name}
                </button>
              </div>
            </Link>
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