import OrderCard from "@components/cards/OrderCard";
import ShoppingCartCard from "@components/cards/ShoppingCartCard";
import { UserService } from "@services/UserService";
import styles from "@styles/OrderForm.module.css";
import { Build, Order } from "@types";
import React, { useEffect, useState } from "react";

const OrderForm: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [shoppingCart, setShoppingCart] = useState<Build[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedBuilds = await UserService.getUserDetails();
        setOrders(fetchedBuilds.orders);
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
        else console.error("An unknown error occurred.");
      }
    };

    fetchOrders();
  }, []);

  console.log(orders);

  return (
    <>
      <div className={styles.container}>
        <ShoppingCartCard builds={[]} price={0} orderStatus={""} orderDate={""} />
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