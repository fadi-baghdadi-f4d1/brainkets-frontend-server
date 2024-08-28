import { useState, useEffect } from 'react';
import cookie from 'cookie';

const useLocale = () => {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = cookie.parse(document.cookie);
      const locale = cookies['NEXT_LOCALE'] || 'en';
      setLocale(locale);
    }
  }, []);

  return locale;
};

export default useLocale;
