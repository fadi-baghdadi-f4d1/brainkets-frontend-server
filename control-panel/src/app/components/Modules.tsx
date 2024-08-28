// "use client";
// import React, { useState, useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import '../globals.css'
//
// const Loader = () => (
//     <div className="flex items-center justify-center">
//         <div
//             className="flex items-center justify-center w-72 h-32 bg-cover bg-center rounded-lg"
//             style={{ backgroundImage: "url('/Vector.png')" }}
//         >
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
//         </div>
//     </div>
// );
//
// const Modules = () => {
//     const [loading, setLoading] = useState(true);
//
//     const cards = Array.from({ length: 30 }, (_, index) => ({
//         id: index + 1,
//         image: '/Frame 8520.png',
//         title: `Module ${index + 1}`,
//     }));
//
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setLoading(false);
//         }, 1000);
//         return () => clearTimeout(timer);
//     }, []);
//
//     if (loading) {
//         return <Loader />;
//     }
//
//     return (
//         <div className="px-8 py-2">
//             <Swiper
//                 spaceBetween={20}
//                 navigation
//                 pagination={{ clickable: true }}
//                 modules={[Navigation, Pagination]}
//                 breakpoints={{
//                     640: { slidesPerView: 1 },
//                     768: { slidesPerView: 1 },
//                     1024: { slidesPerView: 1 },
//                 }}
//             >
//                 {cards.reduce((acc, card, index) => {
//                     const chunkIndex = Math.floor(index / 15);
//
//                     if (!acc[chunkIndex]) {
//                         acc[chunkIndex] = []; // start a new chunk
//                     }
//
//                     acc[chunkIndex].push(card);
//
//                     return acc;
//                 }, []).map((chunk, slideIndex) => (
//                     <SwiperSlide key={slideIndex}>
//                         <div className="grid grid-cols-5 grid-rows-3 gap-x-4 gap-y-3">
//                             {chunk.map((card) => (
//                                 <div
//                                     key={card.id}
//                                     className="bg-[#508C9B] w-[250px] flex items-center justify-center rounded-lg text-white"
//                                 >
//                                     <div>
//                                         <img
//                                             src={card.image}
//                                             alt={card.title}
//                                             className="rounded-t-lg w-[250px] h-[120px]"
//                                         />
//                                         <h3 className="text-center mt-1 mb-2">{card.title}</h3>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </SwiperSlide>
//                 ))}
//
//             </Swiper>
//             {/* Add pagination below the swiper */}
//         </div>
//     );
// };
//
// export default Modules;
"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../globals.css';

const Loader: React.FC = () => (
    <div className="flex items-center justify-center">
        <div
            className="flex items-center justify-center w-72 h-32 bg-cover bg-center rounded-lg"
            style={{ backgroundImage: "url('/Vector.png')" }}
        >
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
        </div>
    </div>
);

interface Card {
    id: number;
    image: string;
    title: string;
}

const Modules: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const cards: Card[] = Array.from({ length: 30 }, (_, index) => ({
        id: index + 1,
        image: '/Frame 8520.png',
        title: `Module ${index + 1}`,
    }));

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="px-8 py-2">
            <Swiper
                spaceBetween={20}
                pagination={{ clickable: true }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
            >
                {cards.reduce((acc: Card[][], card, index) => {
                    const chunkIndex = Math.floor(index / 15);

                    if (!acc[chunkIndex]) {
                        acc[chunkIndex] = []; // start a new chunk
                    }

                    acc[chunkIndex].push(card);

                    return acc;
                }, []).map((chunk, slideIndex) => (
                    <SwiperSlide key={slideIndex}>
                        <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-3 lg:grid-cols-5">
                            {chunk.map((card) => (
                                <div
                                    key={card.id}
                                    className="bg-[#508C9B] w-[200px] flex items-center justify-center rounded-lg text-white lg:w-[250px] xl:w-[330px]"
                                >
                                    <div>
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="rounded-t-lg w-[200px] h-[120px] xl:h-[180px] lg:w-[250px] xl:w-[330px]"
                                        />
                                        <h3 className="text-center mt-1 mb-1.5">{card.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Modules;
