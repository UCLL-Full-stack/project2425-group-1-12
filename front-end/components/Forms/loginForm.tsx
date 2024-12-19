import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import styles from '../../styles/loginForm.module.css';
import InputField from '@components/uiComponents/InputField';
import CustomButton from '@components/uiComponents/CustomButton';
import LanguageSwitcher from '@components/uiComponents/languageSwitcher';
import { useTranslation } from 'next-i18next';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const { t } = useTranslation()
    const handleRegisterRouting = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            router.push('/register')
        } catch(error) {
            alert(error)
        }
    }
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userInput = { email, password };
            const user = await UserService.login(userInput);
            router.push('/account');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'An unknown error occurred during login.');
        }
    };

    return (
        <div className={styles.formContainer}>
            <h4>Login</h4>
            <InputField
                title="Email:"
                label={t('login.emailLoginLabel')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                title={t("login.passwordLoginTitle")}
                label={t("login.passwordLoginLabel")}
                value={password}
                secure={true}
                onChange={(e) => setPassword(e.target.value)}
            />
            <LanguageSwitcher />
            <div className='buttons'>
            <CustomButton
                label='Login'
                onPress={handleLogin}/>

            <CustomButton
                label={t('login.registerButtonLabel')}
                onPress={handleRegisterRouting}
            />
            </div>
        </div>
    );
};

export default LoginForm;
