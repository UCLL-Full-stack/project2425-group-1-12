
import { UserService } from "@services/UserService";
import { BuildService } from "@services/BuildService";
import styles from "@styles/OrderForm.module.css";
import { Build, Order } from "@types";
import React, { useEffect, useState } from "react";
import { OrderService } from "@services/OrderService";
import ShoppingCartCard from "@components/Cards/ShoppingCartCard";
import OrderCard from "@components/Cards/orderCard";
import { useTranslation } from "next-i18next";

const OrderForm: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [shoppingCartBuilds, setShoppingCartBuilds] = useState<Build[]>([]);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchShoppingCartContent = async () => {
      try {
        const shoppingCart = JSON.parse(sessionStorage.getItem("shoppingCart") as string);
        if (!shoppingCart || shoppingCart.length === 0) return;

        const fetchedBuilds = await Promise.all(
          shoppingCart.map(async (id: number) => {
            try {
              return await BuildService.getBuildFromId(id);
            } catch (error) {
              console.error(`Failed to fetch build with id ${id}:`, error);
              return null;
            }
          })
        );

        setShoppingCartBuilds(fetchedBuilds.filter((build) => build !== null));
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
      }
    };
    const fetchOrders = async () => {
      try {
        const userDetails = await UserService.getUserDetails();
        const sortedOrders = userDetails.orders.sort((
          a: { orderDate: string | number | Date; },
          b: { orderDate: string | number | Date; }) => {
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          });
        setOrders(sortedOrders);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
      }
    };

    fetchShoppingCartContent();
    fetchOrders();
  }, []);

  const handleConfirmOrder = async () => {
    if (!confirm("Are you sure you want to order?")) return;
    if (await OrderService.createOrder()) {
      location.reload();
    }
  }

  const handleCancelOrder = () => {
    if (!confirm("Are you sure you want to clear your shopping cart?")) return;
    sessionStorage.removeItem('shoppingCart');
    setShoppingCartBuilds([]);
  }

  return (
    <>
      <div className={styles.container}>
        <ShoppingCartCard
          builds={shoppingCartBuilds}
          onConfirmOrder={() => handleConfirmOrder()}
          onCancelOrder={handleCancelOrder}
        />
      </div>

      <div className={styles.container}>
        <h2>{t('orders.title')}</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))
        ) : (
          <p>{t('orders.noOrders')}</p>
        )}
      </div>
    </>
  );
};

export default OrderForm;