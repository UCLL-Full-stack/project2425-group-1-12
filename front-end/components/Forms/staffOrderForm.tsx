import React, { useEffect, useState } from "react";
import { OrderService } from "@services/OrderService";
import styles from "@styles/OrderForm.module.css";
import { Order } from "@types";
import OrderCard from "@components/Cards/orderCard";

const StaffOrderForm: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const fetchedOrders = await OrderService.getAllOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error(
          error instanceof Error ? error.message : "An unknown error occurred."
        );
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h2>All Orders</h2>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.id} className={styles.orderContainer}>
            <p>
              <strong>User:</strong> {order.user.name} ({order.user.email})
            </p>
            <OrderCard {...order} />
          </div>
        ))
      ) : (
        <p>Loading orders...</p>
      )}
    </div>
  );
};

export default StaffOrderForm;
