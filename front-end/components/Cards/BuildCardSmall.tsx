import React from "react";
import styles from "@styles/OrderForm.module.css";
import { Build } from "@types";

const BuildCardSmall: React.FC<Build> = ({ name, parts, price, preBuild }) => {
  return (
    <div className={styles.buildCard}>
      <h3 className={styles.buildTitle}>{name}</h3>

      <div className={styles.buildDetails}>
        <div className={styles.buildTotalPrice}>
          <div>Totale Prijs: <b>€{price}</b></div>
          <div>Is Prebuilt: <b>{preBuild ? <>Ja</> : <>Nee</>}</b></div>
        </div>

        <div className={styles.buildCoreSpecs}>
          <div>CPU: <b>{parts[0].name}</b></div>
          <div>GPU: <b>{parts[1].name}</b></div>
        </div>
      </div>
    </div>
  );
};

export default BuildCardSmall;