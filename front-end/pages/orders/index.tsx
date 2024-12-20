import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { User } from '@types';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import OrderForm from '@components/Forms/OrderForm';
import StaffOrderForm from '@components/Forms/staffOrderForm';
import useSWR from 'swr';

const Orders: React.FC = () => {
  const router = useRouter();

  const fetchUserByEmail = async (email: string) => {
    if (!email) {
      throw new Error("No email provided");
    }
    const user = await UserService.getUserByEmail(email);
    return user;
  };;

  const loggedInUser = localStorage.getItem('loggedInUser');
  const email = loggedInUser ? JSON.parse(loggedInUser).email : null;

  const { data: user, error, isLoading } = useSWR<User | null>(email ? `user-${email}` : null, () => fetchUserByEmail(email), {
    revalidateOnFocus: false,
  });

  React.useEffect(() => {
    if (!email || error) {
      router.push('/');
    }
  }, [email, error, router]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="body">
      <Header />
      {user.role === 'admin' || user.role === 'staff' ? <StaffOrderForm /> : <OrderForm />}
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
