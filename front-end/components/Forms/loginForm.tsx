import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'next/router';
import { UserService } from '@services/UserService';
import styles from '../../styles/loginForm.module.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const userData = await UserService.getUserByEmail(email);
            if (userData.password === password) {
                await AsyncStorage.setItem('loggedInUser', JSON.stringify(userData));
                router.push('/account');
            } else {
                setError('Invalid email or password');
            }
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
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
                {error && <p className={styles.error}>{error}</p>}
                <button className={styles.button} type="submit">Login</button>
                <div className={styles.registerLink}>
                    <p>Don't have an account? <a href="/register">Register</a></p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
