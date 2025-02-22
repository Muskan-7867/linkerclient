
import  { useContext } from 'react';
import LinksContext, { Link } from '../context/LinksContext';

function LinksDisplay() {
    const { links } = useContext(LinksContext) as { links: Link[] };

    return (
        <div className="mt-4">
            {links.map((link, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                   
                   <p className="text-gray-700">
                       <span className="font-medium">Title:</span> {link.title}
                    </p>
                    <p className="text-gray-700">
                       <span className="font-medium">Icon:</span> {link.icon}
                    </p>
                    <p className="text-gray-700">
                       <span className="font-medium">Link:</span> {link.url}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default LinksDisplay;