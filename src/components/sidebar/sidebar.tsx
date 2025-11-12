import { useState } from "react";
import "./sidebar.css";
import logo from "../../assets/Popme.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMenu: (menu: string) => void; // 👈 NUEVO prop
}

const Sidebar = ({ isOpen, onClose, onSelectMenu }: SidebarProps) => {
  const [activeMenu, setActiveMenu] = useState("Home");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    onSelectMenu(menu); // 👈 avisamos al padre
    onClose(); // cierra sidebar al hacer clic
  };

  return (
    <>
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 40,
            transition: "opacity 0.3s",
          }}
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="logo-section">
          <img src={logo} alt="PopMe logo" className="logo" />
        </div>

        <button className="menu-toggle" onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>

        <nav className="nav">
          <ul>
            <li
              className={activeMenu === "Home" ? "active" : ""}
              onClick={() => handleMenuClick("Home")}
            >
              <i className="bx bx-home"></i>
              <span>Home</span>
            </li>
            <li
              className={activeMenu === "Movies" ? "active" : ""}
              onClick={() => handleMenuClick("Movies")}
            >
              <i className="bx bx-movie"></i>
              <span>Movies</span>
            </li>
            <li
              className={activeMenu === "Collections" ? "active" : ""}
              onClick={() => handleMenuClick("Collections")}
            >
              <i className="bx bx-heart"></i>
              <span>Collections</span>
            </li>
            <li
              className={activeMenu === "Profile" ? "active" : ""}
              onClick={() => handleMenuClick("Profile")}
            >
              <i className="bx bx-user"></i>
              <span>Profile</span>
            </li>
          </ul>
        </nav>

        <button className="logout">
          <i className="bx bx-log-out"></i>
          <span>Log Out</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
