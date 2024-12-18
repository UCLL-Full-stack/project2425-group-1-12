import React from "react";
import styles from "@styles/OrderForm.module.css";
import { Order } from "@types";
import BuildCardSmall from "./BuildCardSmall";

const OrderCard: React.FC<Order> = ({ builds, price, orderStatus, orderDate }) => {
  const [year, month, day] = orderDate.split('T')[0].split('-');

  return (
    <div className={styles.orderCard}>
      <h3>Order on {`${day}/${month}/${year}`}</h3>

      <div className={styles.orderCardContent}>
        <ul className={styles.orderCardDetails}>
          <li>Total Price: € {price}</li>
          <li>Status: {orderStatus}</li>
        </ul>
        <div className={styles.orderCardBuilds}>
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