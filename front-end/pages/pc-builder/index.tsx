import React from 'react';
import Header from '@components/header';
import BuildForm from '@components/Forms/BuildsForm';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PcBuilder: React.FC = () => {
  return (
    <div>
    <Header />
    <BuildForm />
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
export default PcBuilder;