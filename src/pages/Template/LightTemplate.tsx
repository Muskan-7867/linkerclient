import React from "react";

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

interface LightTemplateProps {
  profileInfo: ProfileInfo;
  links: Link[];
}

const LightTemplate: React.FC<LightTemplateProps> = ({ profileInfo, links }) => {
  return (
    <div className="text-center p-6 bg-white border-2 border-black text-gray-500  mt-[20%] rounded-lg shadow-lg w-[90%] sm:w-[24rem] md:w-[28rem] lg:w-[20rem] mx-auto">
      {/* Profile Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={profileInfo.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h2 className="text-xl font-bold text-gray-800">{profileInfo.name}</h2>
        <p className="text-gray-600">{profileInfo.info}</p>
      </div>

      {/* Links with Icons */}
      <div className="space-y-4">
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
