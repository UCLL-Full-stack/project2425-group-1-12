import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import styles from '../../styles/loginForm.module.css';
import InputField from '@components/uiComponents/InputField';
import CustomButton from '@components/uiComponents/CustomButton';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
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
            const userObj = await UserService.getUserByEmail(email);
            if (!userObj) {
                alert(`User with email: ${email} does not exist!`)
                return;
            }
            if (password != userObj.password) {
                alert('Password is not right')
                return;
            }
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
            label="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
            title="Password:"
            label="Enter password"
            value={password}
            secure={true}
            onChange={(e) => setPassword(e.target.value)}
            />
            <div className='buttons'>
            <CustomButton
             label='Login'
             onPress={handleLogin}/>

             <CustomButton
             label='Register An Account'
             onPress={handleRegisterRouting}
             />
            </div>
        </div>
    );
};

export default LoginForm;
