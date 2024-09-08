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

const UsersCard: React.FC = () => {
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
                    const chunkIndex = Math.floor(index / 12); // Adjust chunk size to 12 (4x3 grid)

                    if (!acc[chunkIndex]) {
                        acc[chunkIndex] = []; // Start a new chunk
                    }

                    acc[chunkIndex].push(card);

                    return acc;
                }, []).map((chunk, slideIndex) => (
                    <SwiperSlide key={slideIndex}>
                        <div className="grid grid-cols-1 grid-rows-4 gap-x-20 gap-y-3 lg:grid-cols-3 lg:grid-rows-4">
                            {chunk.map((card) => (
                                <div
                                    key={card.id}
                                    className="bg-[#FFFFFF] h-[110px] w-full flex flex-col justify-between rounded-lg text-white lg:w-[430px]"
                                >
                                    <div className="flex">
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="rounded-lg w-[150px] h-[110px] p-2 lg:w-[150px]"
                                        />
                                        <div className="flex flex-col justify-between p-2 flex-1">
                                            <div>
                                                <h3 className="text-base text-black font-bold">{card.title}</h3>
                                                <p className="text-sm text-black">CEO</p>
                                                <p className="text-sm text-black">+961 70 123 456</p>
                                            </div>
                                            <div className="flex justify-between mt-3.5">
                                                <button className="bg-[#19B60026] text-sm text-[#19B600] px-4 rounded-md">
                                                    Active
                                                </button>
                                                <button className="bg-[#508C9B] text-sm text-white px-4 rounded-md">
                                                    Admin
                                                </button>
                                            </div>
                                        </div>
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

export default UsersCard;
