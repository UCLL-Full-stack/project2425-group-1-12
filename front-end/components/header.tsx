import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import LanguageSwitcher from './uiComponents/languageSwitcher';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './uiComponents/themeSwitcher';

const Header: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

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
        <div className={styles.leftLinks}>
          <Link href="/account" className={styles.accountLink}>Account</Link>
        </div>

        <div className={styles.middleLinks}>
          <Link href="/pc-builder" className={styles.pcBuilderLink}>{ t('header.Builder') }</Link>
          <Link href="/orders" className={styles.ordersLink}>{ t('header.Orders') }</Link>
        </div>

        <div className={styles.rightLinks}>
          <ThemeSwitcher/>
          <LanguageSwitcher />
          <button onClick={handleLogout} className={styles.logoutLink}>{ t('header.Logout') }</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
