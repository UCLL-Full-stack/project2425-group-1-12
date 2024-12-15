import React, { useState } from "react";

type ButtonProps = {
    label: string;
    onPress: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({ label, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
        onPress();
    };

    return (
        <button 
            className="custom-button"
            onClick={handlePress}
        >
        {label}
        </button>
    );
};

export default CustomButton;
