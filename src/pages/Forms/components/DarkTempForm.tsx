import React, { useEffect, useState } from "react";
import Form from "../Form";
import DarkTemplate from "../../Template/components/DarkTemplate";
import { Link } from "../../../types/link";

interface ProfileInfo {
  name: string;
  info: string;
  image: string;
}
const DarkTempForm: React.FC = () => {
  const [isProfileSubmitted, setIsProfileSubmitted] = useState<boolean>(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: "",
    info: "",
    image: "",
  });

  const [links, setLinks] = useState<Link[]>([
    { id: "", title: "", icon: null, link: "" },
  ]);

  const [treeName, setTreeName] = useState<string>("");
  useEffect(() => {
    const selectedTemplate = localStorage.getItem("selectedTheme");
    try {
      if (selectedTemplate) {
        const parsedTemplate = JSON.parse(selectedTemplate);
        if (typeof parsedTemplate === "object" && parsedTemplate.name) {
          setTreeName(parsedTemplate.name);
        } else {
          setTreeName(selectedTemplate);//
        }
      }
    } catch (error) {
      console.error("Error parsing selectedTheme:", error);
      setTreeName(selectedTemplate || "Default Theme"); // Handle error gracefully
    }
  }, []);

  // Handle profile form submission
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileInfo.name && profileInfo.info && profileInfo.image) {
      setIsProfileSubmitted(true); // Show Link Form
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="  min-h-screen flex items-center justify-center p-6">
      {/* Container */}
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-screen-lg bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Right Side: Dark Template */}
        <div className="flex-1 p-6 lg:p-8  flex flex-col items-center justify-start">
          <DarkTemplate profileInfo={profileInfo} links={links} />
        </div>


        {/* Bottom: Form Section */}
        <div className="flex-1 p-6 lg:p-8 ">
          {!isProfileSubmitted && (
            <form onSubmit={handleProfileSubmit} className="p-6 rounded-lg shadow-lg">
              <label className="block mb-2 text-lg font-semibold">Name:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter your name"
                value={profileInfo.name}
                onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
              />

              <label className="block mt-4 mb-2 text-lg font-semibold">Info:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Enter short description"
                value={profileInfo.info}
                onChange={(e) => setProfileInfo({ ...profileInfo, info: e.target.value })}
              />

              <label className="block mt-4 mb-2 text-lg font-semibold">Profile Image URL:</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="Paste image URL"
                value={profileInfo.image}
                onChange={(e) => setProfileInfo({ ...profileInfo, image: e.target.value })}
              />

              <button
                type="submit"
                className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            </form>
          )}
          {isProfileSubmitted && (
            <div className=" p-6 rounded-lg shadow-lg ">

              <Form links={links} setLinks={setLinks} treeName={treeName} setTreeName={setTreeName} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DarkTempForm;
