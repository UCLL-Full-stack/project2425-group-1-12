import OrderCard from "@components/cards/OrderCard";
import ShoppingCartCard from "@components/cards/ShoppingCartCard";
import { UserService } from "@services/UserService";
import { BuildService } from "@services/BuildService";
import styles from "@styles/OrderForm.module.css";
import { Build, Order } from "@types";
import React, { useEffect, useState } from "react";

const OrderForm: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [shoppingCartBuilds, setShoppingCartBuilds] = useState<Build[]>([]);

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
        const fetchedBuilds = await UserService.getUserDetails();
        setOrders(fetchedBuilds.orders);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
      }
    };

    fetchShoppingCartContent();
    fetchOrders();
  }, []);

  const handleConfirmOrder = () => {
    if (!confirm("Are you sure you want to order?")) return;


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
        <h2>Orders</h2>
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.id} {...order} />
          ))
        ) : (
          <p>Loading orders...</p>
        )}
      </div>
    </>
  );
};

export default OrderForm;