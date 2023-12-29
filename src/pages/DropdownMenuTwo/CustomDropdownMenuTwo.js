import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import {
  FaBars,
  FaSignInAlt,
  FaSignOutAlt,
  FaPoll,
  FaArrowLeft,
} from "react-icons/fa";
import "./CustomDropdownMenuTwo.css";

const handleClearLocalStorage = () => {
  localStorage.clear();
  // navigate("/login");
  window.location.reload();
};

const CustomDropdownMenu = () => {
  const retroceder = () => {
    window.history.back();
  };

  const [isActive, setIsActive] = useState(false);
  const handleToggleMenu = () => {
    setIsActive(!isActive);
  };
  useEffect(() => {
    const handleResize = () => {
      setIsActive(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Dropdown>
      {window.innerWidth <= 768 && (
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          <FaBars />
        </Dropdown.Toggle>
      )}

      <Dropdown.Menu>
        <Dropdown.Item href="/pollsterForm">
          <FaPoll /> Proyectos Encuestador
        </Dropdown.Item>
        <Dropdown.Item href="/createProject">
          <FaSignInAlt /> Ingresar Proyecto
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={retroceder}>
          <FaArrowLeft /> Retroceder
        </Dropdown.Item>
      </Dropdown.Menu>
        {isActive && <div className="menu-list active">{}</div>}
    </Dropdown>
  );
};

export default CustomDropdownMenu;
