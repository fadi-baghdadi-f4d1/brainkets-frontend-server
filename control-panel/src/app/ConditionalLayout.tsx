"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Sidebar from "../app/components/Sidebar";
import Header from "../app/components/Navbar";
import BottomNavbar from "../app/components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ConditionalLayoutProps {
    children: React.ReactNode;
    locale: string;
}

const ConditionalLayout: React.FC<ConditionalLayoutProps> = ({ children, locale: initialLocale }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [locale, setLocale] = useState<string>(initialLocale);
    const router = useRouter();

    useEffect(() => {
        const isRtl = locale === 'ar';
        document.body.classList.toggle('rtl', isRtl);
    }, [locale]);

    const renderSidebarAndHeader = !/^\/(en|ar|fr)$/.test(pathname);
    const renderBottomNavbar = !/^\/(en|ar|fr)$/.test(pathname); // Adjust this condition if needed

    const handleLocaleChange = (nextLocale: string) => {
        setLocale(nextLocale);

        const queryParams = searchParams.toString();

        const newPathname = `/${nextLocale}${pathname.replace(/^\/[a-z]{2}/, '')}`;
        const newUrl = `${newPathname}${queryParams ? `?${queryParams}` : ''}`;
        router.push(newUrl);
    };

    const isRTL = locale === 'ar';

    return (
        <>
            <ToastContainer
                autoClose={3000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                style={{ top: '70px' }}
                theme="colored" position="top-center" className="flex flex-col"
            />
            {/*{renderSidebarAndHeader && (*/}
            {/*    <>*/}
            {/*        /!*<Sidebar locale={locale} />*!/*/}
            {/*        /!*<Header onLocaleChange={handleLocaleChange} currentLocale={locale} />*!/*/}
            {/*    </>*/}
            {/*)}*/}
            <main className={`transition-all `}>
                {children}
            </main>
            {/*{renderBottomNavbar && (*/}
            {/*    <div className="block md:block sm:block">*/}
            {/*        /!*<BottomNavbar locale={locale} />*!/*/}
            {/*    </div>*/}
            {/*)}*/}
        </>
    );
};

export default ConditionalLayout;
