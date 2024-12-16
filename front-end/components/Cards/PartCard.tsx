import React from "react";
import styles from "@styles/BuildForm.module.css";
import { Part } from "@types";

const PartCard: React.FC<Part> = ({ name, brand, type, price }) => {
  return (
    <div className={styles.partCard}>
      <div>
        {type}
      </div>
      <div>
        €{price}
      </div>
      <div>
        {brand} {name}
      </div>
    </div>
  );
};

export default PartCard;