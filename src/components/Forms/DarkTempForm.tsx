import React, { useState } from "react";
import Form from "./Form";
import DarkTemplate from "../../pages/Template/DarkTemplate";

interface ProfileInfo {
  name: string;
  info: string;
  image: string;
}

interface Link {
  title: string;
  icon: JSX.Element | null;
  link: string;
}

const DarkTempForm: React.FC = () => {
 
  const [profileInfo] = useState<ProfileInfo>({
    name: "John Doe",
    info: "Web Developer from XYZ",
    image:
      "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=", // Replace with your image URL
  });

  const [links, setLinks] = useState<Link[]>([
    { title: "", icon: null, link: "" }, 
  ]);

  return (
    <div className="bg-gradient-to-r  min-h-screen flex items-center justify-center p-6">
    {/* Container */}
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-screen-lg bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Right Side: Dark Template */}
        <div className="flex-1 p-6 lg:p-8  flex flex-col items-center justify-start">
          <DarkTemplate profileInfo={profileInfo} links={links} />
        </div>
    

      {/* Bottom: Form Section */}
      <div className="flex-1 p-6 lg:p-8 ">
        <div className=" p-6 rounded-lg shadow-lg ">
          
          <Form links={links} setLinks={setLinks} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default DarkTempForm;
