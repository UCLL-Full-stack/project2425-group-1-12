import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@components/forms/loginForm';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Home: React.FC = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
                router.push('/account');
            }
        };

        fetchLoggedInUser();
    }, [router]);

    return (
      <div className='body'>
        <LoginForm />
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

export default Home;
