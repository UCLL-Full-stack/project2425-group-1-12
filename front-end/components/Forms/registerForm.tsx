import React, { useState } from 'react';
import styles from '../../styles/loginForm.module.css';
import { User, Order } from '@types';
import { UserService } from '@services/UserService';
import InputField from '@components/uiComponents/InputField';
import CustomButton from '@components/uiComponents/CustomButton';
import { useRouter } from 'next/router';

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [orders] = useState<Order[]>([]);
    const router = useRouter();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: User = { name, email, password, address, orders };
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
            <h4>Register</h4>
            <InputField
                title="Name:"
                label="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputField
                title="Email:"
                label="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
                title="Password:"
                label="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
                title="Address:"
                label="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
            <div className="buttons">
                <CustomButton
                    label="Register"
                    onPress={handleRegister}
                />
            </div>
        </div>
    );
};

export default RegisterForm;
