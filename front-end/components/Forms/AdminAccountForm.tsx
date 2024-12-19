import React, { useEffect, useState } from 'react';

import styles from '../../styles/adminAccountForm.module.css';
import { User } from '../../types/index';
import { UserService } from '@services/UserService';
import UserCard from '@components/Cards/userCard';

const AdminAccountForm: React.FC = () => {
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
            <h1 className={styles.title}>Admin Account Management</h1>
            <div className={styles.userCards}>
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

export default AdminAccountForm;
