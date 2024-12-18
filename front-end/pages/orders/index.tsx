import React from 'react';
import Header from '@components/header';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import OrderForm from '@components/forms/OrderForm';

const Orders: React.FC = () => {
  return (
    <div className="body">
      <Header />
      <OrderForm />
    </div>
  );
};
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Orders;