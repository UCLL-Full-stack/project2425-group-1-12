import React, { useEffect, useState } from 'react';
import Header from '@components/General/header';
import { useRouter } from 'next/router';
import { User } from '@types';
import AccountForm from '@components/Forms/AccountEditAndOvervieuw';

const Account: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    address: '',
    orders: [],
  });

  const router = useRouter();

  const fetchUserData = () => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const userObj = JSON.parse(loggedInUser);
        setUser(userObj);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to load user data from localStorage', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <AccountForm user={user} setUser={setUser} />
    </>
  );
};

export default Account;
