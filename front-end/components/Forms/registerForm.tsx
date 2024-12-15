import React, { useState } from 'react';
import styles from '../../styles/loginForm.module.css';
import { User, Order } from "@types"; 
import { UserService } from '@services/UserService';

interface RegisterFormProps {
    onRegister: (user: User) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: User = { name, email, password, address, orders };
        onRegister(newUser);

        try {
            const registeredUser = await UserService.registerUser(newUser);
            localStorage.setItem('loggedInUser', JSON.stringify(registeredUser));
            alert('Registration successful!');
        } catch (error) {
            alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Name:</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="password">Password:</label>
                    <input
                        className={styles.input}
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="address">Address:</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="address"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.button} type="submit">Register</button>
                <div className={styles.registerLink}>
                </div>
            </form>
        </div>
    );
};

export default RegisterForm;
