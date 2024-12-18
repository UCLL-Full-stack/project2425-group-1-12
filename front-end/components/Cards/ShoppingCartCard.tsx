import React from "react";
import styles from "@styles/OrderForm.module.css";
import { Build } from "@types";
import BuildCardSmall from "./BuildCardSmall";

interface ShoppingCartCardProps {
  onConfirmOrder: () => void;
  onCancelOrder: () => void;
  builds: Build[];
}

const ShoppingCartCard: React.FC<ShoppingCartCardProps> = ({ onConfirmOrder, onCancelOrder, builds }) => {
  return (
    <div className={styles.orderCartCard}>
      <h2>Shopping Cart</h2>
      <div className={styles.buildCards}>
        {builds.length > 0 ? (
          <>
            {builds.map((build) => (<BuildCardSmall key={build.id} {...build} />))}
            <div className={styles.orderCartButtons}>
              <button onClick={onConfirmOrder}>Order</button>
              <button onClick={onCancelOrder}>Cancel</button>
            </div>
          </>
        ) : (
          <p>No builds in cart, try making some builds.</p>
        )}
      </div>

    </div>
  );
};

export default ShoppingCartCard;