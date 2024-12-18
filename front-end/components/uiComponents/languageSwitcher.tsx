import React, { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Flag from "react-world-flags";
import styles from "../../styles/language.module.css";

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    router.push({ pathname, query }, asPath, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className={styles.languageSwitcher}>
      <button className={styles.languageButton} onClick={() => setIsOpen(!isOpen)}>
        {locale === "en" ? (
          <>
            <Flag code="US" className={styles.flagIcon} /> English
          </>
        ) : (
          <>
            <Flag code="BE" className={styles.flagIcon} /> Nederlands
          </>
        )}
      </button>

      {isOpen && (
        <ul className={styles.dropdownMenu}>
          <li onClick={() => handleLanguageChange("en")} className={styles.dropdownItem}>
            <Flag code="US" className={styles.flagIcon} /> English
          </li>
          <li onClick={() => handleLanguageChange("nl")} className={styles.dropdownItem}>
            <Flag code="BE" className={styles.flagIcon} /> Nederlands
          </li>
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
