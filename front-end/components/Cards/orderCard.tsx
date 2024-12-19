import React from "react";
import styles from "@styles/OrderForm.module.css";
import { Order } from "@types";
import BuildCardSmall from "./BuildCardSmall";
import { useTranslation } from "next-i18next";

const OrderCard: React.FC<Order> = ({ builds, price, orderStatus, orderDate }) => {
  const [year, month, day] = orderDate.split('T')[0].split('-');
  const { t } = useTranslation();

  return (
    <div className={styles.orderCard}>
      <h3>{t('orders.orderOn')}{`${day}/${month}/${year}`}</h3>

      <div className={styles.orderCardContent}>
        <ul className={styles.orderCardDetails}>
          <li>{t('orders.totalPriceOrder')}€{price}</li>
          <li>Status: {orderStatus}</li>
        </ul>
        <div className={styles.buildCards}>
          {builds.length > 0 ? (
            builds.map((build) => (
              <BuildCardSmall key={build.id} {...build} />
            ))
          ) : (
            <p>Loading builds...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;