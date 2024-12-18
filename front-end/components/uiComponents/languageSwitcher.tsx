import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const LanguageSwitcher: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, query, asPath } = router;
    const { t } = useTranslation();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    return (
        <div className="languageSwitcher">
            <label htmlFor="language">{t('header.Language')}</label>
            <select
                id="language"
                className="languageOption"
                value={locale}
                onChange={handleLanguageChange}
            >
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
            </select>
        </div>
    );
};

export default LanguageSwitcher;
