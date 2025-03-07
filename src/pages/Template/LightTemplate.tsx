import React from "react";
import  { Link } from "../../types/link";

interface ProfileInfo {
  name: string;
  info: string;
  image: string;
}
interface LightTemplateProps {
  profileInfo: ProfileInfo;
  links: Link[];
}

const LightTemplate: React.FC<LightTemplateProps> = ({ profileInfo, links }) => {
  return (
    <div className="text-center p-6 bg-white border-2 border-black text-gray-500  mt-[20%] rounded-lg shadow-lg w-[90%] sm:w-[24rem] md:w-[28rem] lg:w-[20rem] mx-auto">
     
     <img
        src={profileInfo.image ||  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto"
      />

      {/* Name & Info */}
      <h2 className="text-xl font-semibold mt-4">{profileInfo.name || "Your Name"}</h2>
      <p className="text-gray-600 ">{profileInfo.info || "Info"}</p>

      {/* Links with Icons */}
      <div className="space-y-4 mt-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.link}
            className="flex items-center p-4 justify-center w-full border-1 border-black  font-medium shadow bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
        
            
          >
            {link.icon && <span className="text-2xl mr-3">{link.icon}</span>}
            <span className="text-gray-700 font-medium">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default LightTemplate;
