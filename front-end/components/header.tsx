import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';
import Link from 'next/link';

const Header: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await localStorage.removeItem('loggedInUser');
      router.push('/');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <header className={styles.headerContainer}>
      <nav className={styles.navContainer}>
        <div>
          <Link href="/account" className={styles.accountLink}>Account</Link>
        </div>

        <div className={styles.middleLinks}>
          <Link href="/pc-builder" className={styles.pcBuilderLink}>PC Builder</Link>
          <Link href="/orders" className={styles.ordersLink}>Orders</Link>
        </div>

        <div>
          <button onClick={handleLogout} className={styles.logoutLink}>Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
