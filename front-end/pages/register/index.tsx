import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import RegisterForm from '@components/forms/registerForm';

const RegisterPage: React.FC = () => {
    return (
      <div className="body">
        <RegisterForm/>
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
export default RegisterPage;
