import React, { useState } from "react";
import styles from "../../styles/inputField.module.css";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  secure?: boolean;
  editable?: boolean;
  value?: string;
  onTextChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  secure = false,
  editable = true,
  value,
  onTextChange,
  title,
  ...props
}) => {

  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisible = async () => {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <div className={styles.inputFieldContainer}>
      {title && <h6 className={styles.inputFieldTitle}>{title}</h6>}
      <div className="iconAndInputWrapper">
      <input
        type={secure && !isPasswordVisible ? "password" : "text"}
        className={`${styles.inputField} ${isFocused ? styles.focused : ""} ${
          editable ? styles.editable : styles.nonEditable
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={label}
        disabled={!editable}
        {...props}
      />
      {
        secure && (
          <FontAwesomeIcon
          icon={faEye}
          onClick={togglePasswordVisible}
          className="faEye"
          />
        )
      }
      </div>
    </div>
  );
};

export default InputField;
