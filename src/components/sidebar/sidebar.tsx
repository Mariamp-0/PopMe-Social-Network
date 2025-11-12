import { useState } from "react";
import { NavLink } from "react-router-dom";
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
        {/* logo */}
        <div className="logo-section">
          <img src={logo} alt="PopMe logo" className="logo" />
        </div>

        {/* botón para cerrar */}
        <button className="menu-toggle" onClick={onClose}>
          <i className="bx bx-x"></i>
        </button>

        {/* navegación principal */}
        <nav className="nav">
          <ul>
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setActiveMenu("Home");
                  onClose();
                }}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <i className="bx bx-home"></i>
                <span>Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/movies"
                onClick={() => {
                  setActiveMenu("Movies");
                  onClose();
                }}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <i className="bx bx-movie"></i>
                <span>Movies</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/collections"
                onClick={() => {
                  setActiveMenu("Collections");
                  onClose();
                }}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <i className="bx bx-heart"></i>
                <span>Collections</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/profile"
                onClick={() => {
                  setActiveMenu("Profile");
                  onClose();
                }}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <i className="bx bx-user"></i>
                <span>Profile</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* botón logout */}
        <button className="logout">
          <i className="bx bx-log-out"></i>
          <span>Log Out</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
