import React from 'react';
import Header from '@components/header';
import BuildForm from '@components/forms/BuildForm';

const PcBuilder: React.FC = () => {
  return (
    <div>
      <Header />
      <BuildForm />
    </div>
  );
};

export default PcBuilder;