import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const fetchUserData = async () => {
    try {
      const loggedInUser = await AsyncStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const userObj = JSON.parse(loggedInUser);
        setUser(userObj);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to load user data from AsyncStorage', error);
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
