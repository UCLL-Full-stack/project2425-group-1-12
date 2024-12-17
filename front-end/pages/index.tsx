import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LoginForm from '@components/Forms/loginForm';

const Home: React.FC = () => {
    const [user, setUser] = useState<{ name: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLoggedInUser = async () => {
            const loggedInUser = localStorage.getItem('loggedInUser');
            if (loggedInUser) {
                setUser(JSON.parse(loggedInUser));
                router.push('/account');
            }
        };

        fetchLoggedInUser();
    }, [router]);

    return (
        <LoginForm />
    );
};

export default Home;
