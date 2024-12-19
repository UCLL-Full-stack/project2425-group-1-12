import React, { useEffect, useState } from 'react';

import styles from '../../styles/adminAccountForm.module.css';
import { User } from '../../types/index';
import { UserService } from '@services/UserService';
import UserCard from '@components/Cards/userCard';
import { useTranslation } from 'next-i18next';

const AdminAccountForm: React.FC = () => {
    const { t } = useTranslation();
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await UserService.getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                alert(error)
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("adminAccountForm.informationTitle")}</h1>
            <div className={styles.userCards}>
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default AdminAccountForm;
