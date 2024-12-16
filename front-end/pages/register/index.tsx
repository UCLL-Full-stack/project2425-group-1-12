import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import Header from '@components/header';
import { Order } from '@types';
import RegisterForm from '@components/Forms/registerForm';

const RegisterPage: React.FC = () => {
    return (
        <RegisterForm/>
    );
};

export default RegisterPage;
