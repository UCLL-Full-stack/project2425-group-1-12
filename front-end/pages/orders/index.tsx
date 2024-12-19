import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import OrderForm from '@components/Forms/OrderForm';
import StaffOrderForm from '@components/Forms/staffOrderForm';
import { User } from '@types';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';

const Orders: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const fetchUserData = async () => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const { email } = JSON.parse(loggedInUser);
        const userObj = await UserService.getUserByEmail(email);
        setUser(userObj);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
      router.push('/');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

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
