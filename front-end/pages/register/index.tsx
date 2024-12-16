import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RegisterForm from '@components/forms/RegisterForm';
import { UserService } from '@services/UserService';
import Header from '@components/header';
import { Order } from '@types';

const RegisterPage: React.FC = () => {
    const router = useRouter();

    const handleRegister = async () => {
        try {
            router.push('/');
        } catch (error: unknown) {
            if (error instanceof Error) {
                alert(error.message);
            } else {
                alert('An unknown error occurred during registration.');
            }
        }
    };

    return (
        <RegisterForm onRegister={handleRegister} />
    );
};

export default RegisterPage;
