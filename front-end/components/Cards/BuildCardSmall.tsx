import React from "react";
import styles from "@styles/OrderForm.module.css";
import { Build } from "@types";
import { useTranslation } from "next-i18next";

const BuildCardSmall: React.FC<Build> = ({ name, parts, price, preBuild }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.buildCard}>
      <h3 className={styles.buildTitle}>{name}</h3>

      <div className={styles.buildDetails}>
        <div className={styles.buildTotalPrice}>
          <div>{t('orders.totalPriceCart')}<b>€{price}</b></div>
          <div>{t('orders.isPrebuildCart')}<b>{preBuild ? <>Ja</> : <>Nee</>}</b></div>
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