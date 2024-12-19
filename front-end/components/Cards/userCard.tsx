import React from 'react';
import styles from '../../styles/userCard.module.css';
import { User } from '../../types/index';
import { useTranslation } from 'next-i18next';

type UserCardProps = {
    user: User;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
    const { t } = useTranslation();
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>{t('userCard.address')}{user.address}</p>
            </div>
        </div>
    );
};

export default UserCard;
