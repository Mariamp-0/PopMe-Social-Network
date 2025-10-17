import { useState } from "react";
import "./sidebar.css";
import { Home, Film, Heart, User, LogOut, Menu } from "lucide-react";
import logo from "../../assets/Popme.png";

const Sidebar = () => {
  // toggle menu visibility (open/close)
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* logo section */}
      <div className="logo-section">
        <img src={logo} alt="PopMe logo" className="logo" />
      </div>

      {/* menu toggle button (hamburger icon) */}
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <Menu />
      </button>

      {/* main navigation links */}
      <nav className="nav">
        <ul>
          <li>
            <Home />
            <span>Home</span>
          </li>
          <li>
            <Film />
            <span>Movies</span>
          </li>
          <li>
            <Heart />
            <span>Collections</span>
          </li>
          <li>
            <User />
            <span>Profile</span>
          </li>
        </ul>
      </nav>

      {/* logout button */}
      <button className="logout">
        <LogOut />
        <span>Log Out</span>
      </button>
    </aside>
  );
};

export default Sidebar;
