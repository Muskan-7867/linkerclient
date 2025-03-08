import  { Link } from "../../types/link";

interface ProfileInfo {
  name: string;
  info: string;
  image: string;
}

interface DarkTemplateProps {
  profileInfo: ProfileInfo;
  links: Link[];
}

const DarkTemplate: React.FC<DarkTemplateProps> = ({ profileInfo, links }) => {
  return (
    <div className="text-center p-6 bg-gray-800 text-white mt-[20%] rounded-lg shadow-lg w-[90%] sm:w-[24rem] md:w-[28rem] lg:w-[20rem] mx-auto">
      {/* Profile Info */}
      <img
        src={profileInfo.image ||  "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto"
      />

      {/* Name & Info */}
      <h2 className="text-xl font-semibold mt-4">{profileInfo.name || "Your Name"}</h2>
      <p className="text-gray-600 mb-4">{profileInfo.info || "Info"}</p>


      {/* Links */}
      <div className="space-y-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full bg-gray-200 hover:bg-gray-300 py-3 rounded-lg text-gray-800 font-medium shadow transition duration-200"
          >
           {link.icon && <span className="text-2xl mr-3">{link.icon}</span>}
           <span className="text-gray-700 font-medium">{link.title}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default DarkTemplate;

