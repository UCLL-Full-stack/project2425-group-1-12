import React from "react";
import styles from "@styles/BuildForm.module.css";
import { Build } from "@types";
import PartCard from "./PartCard";

const BuildCard: React.FC<Build> = ({ name, parts, price, preBuild }) => {
  return (
    <div className={styles.buildCard}>
      <h2 className={styles.buildTitle}>{name}</h2>
        Prebuild? {preBuild ? <>True</> : <>False</>}
        Total Price: {price}
        {parts.map((part) => (<PartCard key={part.id} {...part} />))}
    </div>
  );
};

export default BuildCard;