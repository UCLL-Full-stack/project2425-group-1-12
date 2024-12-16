import React from "react";
import styles from "@styles/BuildForm.module.css";
import { Build } from "@types";
import PartCard from "./PartCard";

const BuildCard: React.FC<Build> = ({ name, parts, price, preBuild }) => {
  return (
    <div className={styles.buildCard}>
      <h2 className={styles.buildTitle}>{name}</h2>
      {parts.map((part) => (<PartCard key={part.id} {...part} />))}
      <div className={styles.buildTotalPrice}>
        <div>Totale Prijs: </div>
        <div><b>€{price}</b></div>
        <div>Is Prebuilt:</div>
        <div><b>{preBuild ? <>Ja</> : <>Nee</>}</b></div>
      </div>
    </div>
  );
};

export default BuildCard;