import React, { useState } from "react";

type ButtonProps = {
    label: string;
    onPress: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CustomButton: React.FC<ButtonProps> = ({ label, onPress }) => {
    const [isPressed, setIsPressed] = useState(false);


    return (
        <button 
            className="custom-button"
            onClick={onPress}
        >
            {label}
        </button>
    );
};

export default CustomButton;
