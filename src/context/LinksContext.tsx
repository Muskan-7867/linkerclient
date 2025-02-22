import React, { createContext, useState } from "react";

export interface Link {
  title: string;
  icon: string;
  url: string;
}

interface LinkContextType {
  links: Link[];
  addNewLink: () => void;
  updateLink: (index: number, key: keyof Link, value: string) => void;
}

const LinksContext = createContext<LinkContextType | undefined>(undefined);

export const LinksProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [links, setLinks] = useState<Link[]>([
    { title: "", icon: "", url: "" },
  ]);

  const addNewLink = () => {
    setLinks([...links, { title: "", icon: "", url: "" }]);
  };

  const updateLink = (index: number, key: keyof Link, value: string) => {
    const updatedLinks = links.map((link, i) =>
      i === index ? { ...link, [key]: value } : link
    );
    setLinks(updatedLinks);
  };

  const value = {
    links,
    addNewLink,
    updateLink,
  };

  return (
    <LinksContext.Provider value={value}>{children}</LinksContext.Provider>
  );
};

export default LinksContext;
