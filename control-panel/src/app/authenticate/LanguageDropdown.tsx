"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import { useTranslations } from 'next-intl';
import USFlag from '../../../public/navbar/Vector (1).svg';
import FRFlag from '../../../public/navbar/Vector (1).svg';
import LEBFlag from '../../../public/navbar/Vector (1).svg';
import { setCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import cookie from 'cookie';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

interface LocaleOption {
  flag: StaticImageData; // Type for images imported using 'next/image'
  label: string;
}

const localeOptions: Record<string, LocaleOption> = {
  en: { flag: USFlag, label: 'English' },
  fr: { flag: FRFlag, label: 'French' },
  ar: { flag: LEBFlag, label: 'Arabic' },
};

const LanguageDropdown: React.FC = () => {
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
  const [currentLocale, setCurrentLocale] = useState<string>('en');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const t = useTranslations('header');
  const isRTL = currentLocale === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const cookies = cookie.parse(document.cookie);
      setCurrentLocale(cookies['NEXT_LOCALE'] || 'en');
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    setCurrentLocale(newLocale);
    setCookie(null, 'NEXT_LOCALE', newLocale, {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });
    router.push(`/${newLocale}`);
    setDropdownVisible(false);
  };

  const currentOption = localeOptions[currentLocale] || localeOptions['en'];

  return (
      <div className={`relative ${isRTL ? 'mr-0' : 'ml-0'} dropdown`} ref={dropdownRef}>
        <div
            onClick={toggleDropdown}
            className="cursor-pointer bg-white flex flex-row border border-[#C4C4C4] rounded-md p-2 items-center"
        >
          <Image src={currentOption.flag} alt={currentOption.label} width={15} height={15} className={isRTL ? 'ml-2' : 'mr-2'} />
          <h1 className='text-sm font-semibold'>{currentOption.label}</h1>
          {dropdownVisible ? (
              <IoIosArrowUp className={`text-black ${isRTL ? 'mr-2' : 'ml-2'}`} />
          ) : (
              <IoIosArrowDown className={`text-black ${isRTL ? 'mr-2' : 'ml-2'}`} />
          )}
        </div>
        <div
            className={`absolute ${isRTL ? 'left-0' : 'right-0'} mt-1 w-full bg-white border border-[#C4C4C4] rounded-md shadow-lg z-50 transition-all duration-300 ease-in-out transform ${dropdownVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        >
          <ul>
            {Object.entries(localeOptions)
                .filter(([localeCode]) => localeCode !== currentLocale)
                .map(([localeCode, { flag, label }]) => (
                    <li
                        key={localeCode}
                        className={`flex items-center p-2 rounded-lg cursor-pointer text-sm font-semibold ${isRTL ? 'text-right' : 'text-left'}`}
                        onClick={() => handleLocaleChange(localeCode)}
                    >
                      <Image src={flag} alt={label} width={20} height={20} className={isRTL ? 'ml-2' : 'mr-2'} />
                      {label}
                    </li>
                ))}
          </ul>
        </div>
      </div>
  );
};

export default LanguageDropdown;
