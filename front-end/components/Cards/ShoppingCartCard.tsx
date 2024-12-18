import React from "react";
import styles from "@styles/OrderForm.module.css";
import { Order } from "@types";

const ShoppingCartCard: React.FC<Order> = ({ builds, price, orderStatus, orderDate }) => {
  return (
    <div className={styles.orderCartCard}>
      <h2>Shopping Cart</h2>
    </div>
  );
};

export default ShoppingCartCard;