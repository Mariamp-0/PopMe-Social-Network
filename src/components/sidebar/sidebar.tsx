import { useState } from "react";
import "./sidebar.css";
import logo from "../../assets/Popme.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState("Home");

  return (
    <>
      {/* Overlay oscuro cuando el sidebar está abierto */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 40,
            transition: 'opacity 0.3s'
          }}
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        {/* logo section */}
<div className="logo-section">
  <img src={logo} alt="PopMe logo" className="logo" />
</div>
        {/* menu toggle button (hamburger icon) */}
        <button className="menu-toggle" onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>

        {/* main navigation links */}
        <nav className="nav">
          <ul>
            <li
              className={activeMenu === "Home" ? "active" : ""}
              onClick={() => setActiveMenu("Home")}
            >
              <i className="bx bx-home"></i>
              <span>Home</span>
            </li>
            <li
              className={activeMenu === "Movies" ? "active" : ""}
              onClick={() => setActiveMenu("Movies")}
            >
              <i className="bx bx-movie"></i>
              <span>Movies</span>
            </li>
            <li
              className={activeMenu === "Collections" ? "active" : ""}
              onClick={() => setActiveMenu("Collections")}
            >
              <i className="bx bx-heart"></i>
              <span>Collections</span>
            </li>
            <li
              className={activeMenu === "Profile" ? "active" : ""}
              onClick={() => setActiveMenu("Profile")}
            >
              <i className="bx bx-user"></i>
              <span>Profile</span>
            </li>
          </ul>
        </nav>

        {/* logout button */}
        <button className="logout">
          <i className="bx bx-log-out"></i>
          <span>Log Out</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;