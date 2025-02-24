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
  title: string;
  icon: string;
  link: string;
}

const App: React.FC = () => {
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/templates/") &&
    location.pathname !== "/templates";

  // 🔹 State to store links
  const [links, setLinks] = useState<Link[]>([]);
  const [treeName] = useState<string>("");

  return (
    <>
      <div>
        {!hideNavbar && <Navbar />}
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
                <LinkForm links={links} setLinks={setLinks} />
              </div>
            }
          />
          <Route
            path="/linktree-template"
            element={<LinktreeTemplate treeName={treeName} links={links} />}
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
