// // components/Layout.js
// import React from 'react';
// import Sidebar from '../components/Sidebar';
// import Navbar from '../components/Navbar';
// import MainContent from '../components/HomeContent';
// import Footer from "@/app/components/Footer";
//
// const Layout = () => {
//     return (
//         <div className="flex flex-col min-h-screen">
//             {/*<Sidebar />*/}
//             <div className="flex-1">
//                 <Navbar />
//                 <MainContent />
//             </div>
//             <Footer/>
//         </div>
//     );
// };
//
// export default Layout;
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import MainContent from '../../components/UserProfile';
import Footer from '../../components/Footer';
import Chat from "@/components/Chat";

const Layout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <MainContent className="flex-1" /> {/* Ensure MainContent has flex-1 */}
            <div className="bg-[#1B3483]">
                <Chat/>
            </div>
            <Footer/></div>
    );
};

export default Layout;

