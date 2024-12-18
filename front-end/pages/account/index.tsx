import React, { useEffect, useState } from 'react';
import Header from '@components/header';
import { useRouter } from 'next/router';
import { User } from '@types';
import { UserService } from '@services/UserService';
import AccountForm from '@components/forms/AccountEditAndOverview';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';

const Account: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    address: '',
    orders: [],
  });

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

  return (
    <div className="body">
      <Header />
      <AccountForm user={user} setUser={setUser} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Account;
