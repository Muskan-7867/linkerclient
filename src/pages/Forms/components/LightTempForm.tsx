import React, { useState, useEffect } from "react";
import Form from "../Form";
import LightTemplate from "../../Template/components/LightTemplate";
import { Link } from "../../../types/link";

interface ProfileInfo {
  name: string;
  info: string;
  image: string;
}

const LightTempForm: React.FC = () => {
  const [isProfileSubmitted, setIsProfileSubmitted] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"profile" | "links">("profile");

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
        setTreeName(typeof parsedTemplate === "object" ? parsedTemplate.name : parsedTemplate);
      }
    } catch (error) {
      console.error("Error parsing selectedTheme:", error);
      setTreeName(selectedTemplate || "Default Theme");
    }
  }, []);

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileInfo.name && profileInfo.info && profileInfo.image) {
      setIsProfileSubmitted(true);
      setActiveTab("links");
    } else {
      alert("Please fill in all profile fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Your Link Tree</h1>
          <p className="mt-2 text-lg text-gray-600">
            {treeName ? `Using ${treeName} template` : "Select a template to get started"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Preview Panel - Sticky on larger screens */}
          <div className="lg:w-2/5 lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)]">
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Live Preview</h2>
              <div className="flex justify-center">
                <LightTemplate profileInfo={profileInfo} links={isProfileSubmitted ? links : []} />
              </div>
            </div>
          </div>

          {/* Form Panel */}
          <div className="lg:w-3/5">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              {/* Form Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === "profile" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => setActiveTab("profile")}
                >
                  Profile Information
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${activeTab === "links" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                  onClick={() => isProfileSubmitted && setActiveTab("links")}
                  disabled={!isProfileSubmitted}
                >
                  Your Links
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-6 sm:p-8">
                {activeTab === "profile" && (
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your Name
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="John Doe"
                          value={profileInfo.name}
                          onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Short Bio
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Digital creator | Web developer"
                          value={profileInfo.info}
                          onChange={(e) => setProfileInfo({ ...profileInfo, info: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Profile Image URL
                        </label>
                        <input
                          type="url"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com/your-photo.jpg"
                          value={profileInfo.image}
                          onChange={(e) => setProfileInfo({ ...profileInfo, image: e.target.value })}
                          required
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          Upload your image to a service like Imgur and paste the URL here
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300"
                      >
                        Save Profile & Continue to Links
                      </button>
                    </div>
                  </form>
                )}

                {activeTab === "links" && (
                  <div className="space-y-6">
                    <Form 
                      links={links} 
                      setLinks={setLinks} 
                      treeName={treeName} 
                      setTreeName={setTreeName} 
                    />
                    
                    <div className="flex justify-between pt-4">
                      <button
                        onClick={() => setActiveTab("profile")}
                        className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                      >
                        ← Back to Profile
                      </button>
                      <button
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
                        onClick={() => alert("Your link tree has been saved!")}
                      >
                        Publish Your Link Tree
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LightTempForm;