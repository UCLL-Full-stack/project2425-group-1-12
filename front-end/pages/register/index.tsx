import React, { useState } from 'react';
import { useRouter } from 'next/router';
import RegisterForm from '@components/Forms/registerForm';
import { UserService } from '@services/UserService';
import Header from '@components/General/header';
import { Order } from '@types';

const RegisterPage: React.FC = () => {
    const router = useRouter();

    const handleRegister = async (userData: { name: string; email: string; password: string; address: string, orders: Order[] }) => {
        try {
            await UserService.registerUser(userData);
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
