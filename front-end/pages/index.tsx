import React, { useState, useEffect } from 'react';
import LoginForm from '@components/forms/LoginForm';
import { useRouter } from 'next/router';

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
