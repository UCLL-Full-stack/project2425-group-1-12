
import { UserService } from "@services/UserService";
import { BuildService } from "@services/BuildService";
import styles from "@styles/OrderForm.module.css";
import { Build, Order } from "@types";
import React, { useEffect, useState } from "react";
import { OrderService } from "@services/OrderService";
import ShoppingCartCard from "@components/Cards/ShoppingCartCard";
import OrderCard from "@components/Cards/orderCard";
import { useTranslation } from "next-i18next";
import useSWR from "swr";

const OrderForm: React.FC = () => {
  const { t } = useTranslation();

  const fetchShoppingCartContent = async () => {
    const shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart') as string);
    if (!shoppingCart || shoppingCart.length === 0) return [];

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

    return fetchedBuilds.filter((build) => build !== null) as Build[];
  };

  const fetchUserOrders = async () => {
    const userDetails = await UserService.getUserDetails();
    return userDetails.orders;
  };

  var { data: shoppingCartBuilds, error: shoppingCartError } = useSWR('shoppingCart', fetchShoppingCartContent);
  const { data: orders, error: ordersError } = useSWR('orders', fetchUserOrders);

  if (!shoppingCartBuilds || !orders) return <div>Loading...</div>;

  if (shoppingCartError || ordersError) {
    const errorMessage = shoppingCartError?.message || ordersError?.message || 'An unknown error occurred.';
    return <div>Error: {errorMessage}</div>;
  }

  const sortedOrders = orders.sort((a: { orderDate: string | number | Date }, b: { orderDate: string | number | Date }) => {
    return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
  });

  const handleConfirmOrder = async () => {
    if (!confirm("Are you sure you want to order?")) return;
    if (await OrderService.createOrder()) {
      location.reload();
    }
  }

  const handleCancelOrder = () => {
    if (!confirm("Are you sure you want to clear your shopping cart?")) return;
    sessionStorage.removeItem('shoppingCart');
    shoppingCartBuilds = [];
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
        {sortedOrders.length > 0 ? (
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