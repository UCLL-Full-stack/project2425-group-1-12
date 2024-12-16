import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import styles from '../../styles/loginForm.module.css';
import InputField from '@components/uiComponents/InputField';
import CustomButton from '@components/uiComponents/CustomButton';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        console.log('Hello???')
        e.preventDefault();
        try {
            if (password != confirmPassword) {
                alert('Passwords are not identical')
                return;
            }
            const userInput = {email, password};
            UserService.login(userInput);
        } catch (error) {
            alert(error)
        }
    };

    return (
        <div className={styles.loginFormContainer}>
            <h4>Login</h4>
            <InputField
            title="Email:"
            label={'Enter email'}
            value={email}
            />
            <InputField
            title="Password:"
            label={'Enter password'}
            value={password}
            />
            <InputField
            title="Confirm password:"
            label={'Re-enter password'}
            value={confirmPassword}
            />
            <button onClick={handleLogin} />
        </div>
    );
};

export default LoginForm;
