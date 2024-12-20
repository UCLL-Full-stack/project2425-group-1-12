import React from 'react';
import styles from '../../styles/adminAccountForm.module.css';
import { User } from '../../types/index';
import { UserService } from '@services/UserService';
import UserCard from '@components/Cards/userCard';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';

const AdminAccountForm: React.FC = () => {
    const { t } = useTranslation();

    const fetchUsers = async () => {
        const users = await UserService.getAllUsers();
        return users;
    };

    const { data: users, error } = useSWR('/api/users', fetchUsers);

    if (!users) return <div>Loading...</div>;
    if (error) return <div>Error loading users: {error.message}</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("adminAccountForm.informationTitle")}</h1>
            <div className={styles.userCards}>
                {users.map((user: User) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default AdminAccountForm;
