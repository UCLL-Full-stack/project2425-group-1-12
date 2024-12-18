import React, { useState } from 'react';
import styles from '../../styles/loginForm.module.css';
import { User, Order } from '@types';
import {Role} from '@types';
import { UserService } from '@services/UserService';
import InputField from '@components/uiComponents/InputField';
import CustomButton from '@components/uiComponents/CustomButton';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@components/uiComponents/languageSwitcher';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<Role>('user');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [orders] = useState<Order[]>([]);
    const router = useRouter();
    const { t } = useTranslation();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: User = { name,role, email, password, address, orders };
        try {
            const registeredUser = await UserService.registerUser(newUser);
            router.push('/');
            alert('Registration successful!');
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h4>{t('register.registerTitle')}</h4>
            <InputField
                title={t('register.nameRegisterTitle')}
                label={t('register.nameRegisterLabel')}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputField
                title="Email:"
                label={t('register.emailRegisterLabel')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                title={t('register.passwordRegisterTitle')}
                label={t('register.passwordRegisterLabel')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
                title={t('register.addressRegisterTitle')}
                label={t('register.addressRegisterLabel')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <LanguageSwitcher />
            <div className="buttons">
                <CustomButton
                    label={t('register.registerButton')}
                    onPress={handleRegister}
                />
            </div>
        </div>
    );
};

export default RegisterForm;
