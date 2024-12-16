import React from "react";
import styles from "@styles/BuildForm.module.css";
import { Build } from "@types";
import PartCard from "./PartCard";

const BuildCard: React.FC<Build> = ({ parts, price, preBuild }) => {
  return (
    <div className={styles.buildCard}>
      <h2 className={styles.buildTitle}>Build with {parts[0].name}</h2>

        {parts.map((part) => (<PartCard key={part.id} {...part} />))}
    </div>
  );
};

export default BuildCard;