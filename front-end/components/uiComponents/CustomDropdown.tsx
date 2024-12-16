import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight, faCaretDown } from "@fortawesome/free-solid-svg-icons";

interface CustomDropdownProps {
  label: string;
  onClick: () => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleToggle = () => {
    setIsPressed(!isPressed);
    onClick();
  };

  return (
    <button className="dropdownButton" onClick={handleToggle}>
      {label}
      <FontAwesomeIcon
        icon={isPressed ? faCaretDown : faCaretRight}
        className="dropdownIcon"
      />
    </button>
  );
};

export default CustomDropdown;
