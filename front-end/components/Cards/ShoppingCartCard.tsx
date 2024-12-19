import styles from "@styles/OrderForm.module.css";
import { Build } from "@types";
import BuildCardSmall from "./BuildCardSmall";
import { useTranslation } from "next-i18next";

interface ShoppingCartCardProps {
  onConfirmOrder: () => void;
  onCancelOrder: () => void;
  builds: Build[];
}

const ShoppingCartCard: React.FC<ShoppingCartCardProps> = ({ onConfirmOrder, onCancelOrder, builds }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.orderCartCard}>
      <h2>{t('orders.shoppingCart')}</h2>
      <div className={styles.buildCards}>
        {builds.length > 0 ? (
          <>
            {builds.map((build) => (<BuildCardSmall key={build.id} {...build} />))}
            <div className={styles.orderCartButtons}>
              <button onClick={onConfirmOrder}>{t('orders.orderButton')}</button>
              <button onClick={onCancelOrder}>{t('orders.cancelButton')}</button>
            </div>
          </>
        ) : (
          <p>{t('orders.emptyCart')}</p>
        )}
      </div>

    </div>
  );
};

export default ShoppingCartCard;