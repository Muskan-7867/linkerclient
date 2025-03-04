import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { LinksProvider } from "./context/LinksContext";
import Login from "./pages/users/auth/Login";
import Signup from "./pages/users/auth/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Templates from "./pages/Template/Template";
import TemplateDetail from "./pages/Template/TemplateDetail";
import LinksDisplay from "./components/LinkDisplay";
import LinkForm from "./components/Forms/Form";
import LinktreeTemplate from "./components/LinktreeTemplate";
import LinktreePage from "./components/LinktreePage";

interface Link {
  id: string;
  title: string;
  icon: JSX.Element | null;
  link: string;
}

const App: React.FC = () => {
  const location = useLocation();
  const showNavbar = location.pathname === "/"; 

  // Define state variables for treeName and links
  const [treeName, setTreeName] = useState<string>("");
  const [links, setLinks] = useState<Link[]>([]);

  return (
    <>
      <div>
        {showNavbar && <Navbar />} {/* Show Navbar only on home page */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/templates/:id" element={<TemplateDetail />} />
          <Route
            path="/links"
            element={
              <div>
                <LinksDisplay />
                <LinkForm treeName={treeName} links={links} setLinks={setLinks} setTreeName={setTreeName} />
              </div>
            }
          />
          <Route
            path="/linktree-template"
            element={<LinktreeTemplate    />}
          />
          <Route path="/linktree/:treeId" element={<LinktreePage />} />
        </Routes>
      </div>
    </>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <LinksProvider>
      <Router>
        <App />
      </Router>
    </LinksProvider>
  );
};

export default AppWrapper;
