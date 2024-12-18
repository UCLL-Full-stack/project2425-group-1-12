import React from 'react';
import Header from '@components/header';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Orders: React.FC = () => {
  return (
    <div className="body">
      <Header />
      <h1>OrdersPage</h1>
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