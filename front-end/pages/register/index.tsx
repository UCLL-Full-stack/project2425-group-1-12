import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import Header from '@components/header';
import { Order } from '@types';
import RegisterForm from '@components/Forms/registerForm';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterPage: React.FC = () => {
    return (
        <RegisterForm/>
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
