"use client";

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../globals.css';

import modulesData from '../modules.json'; // Adjust the path if necessary

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

interface Module {
    id: number;
    name: string;
    image: string;
    link: string;
}

const Modules: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);

    const token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJmZWRhYSIsInJvbGVJZCI6bnVsbCwiaWF0IjoxNzI0OTMyOTY1LCJleHAiOjE3MjQ5MzM4NjV9.JnQM6Ea5xs95WO01kc6NdaVtpHC9PIvLnJ7VMzFqH7QRrAbyl59g0CWa8CHhjWXU-p7FlVsYzgefQbtfyJ2BSowlLF1RCgCWxfZOgolcMzhXytf1uboQfk1CnB16MupqBckCqoAf20jL7A-LCHM-qwTqwkKX9nArU7XxUiFaFDTKYFWa9-2AFgZUY2U52C5bQ_AULEkatryG_kbYdhmAs2H1dnaHeESlzLv-Q_Ii08HDiCYSLp3MHs08obBanIsdhO8NDKM4zvfem27x5-qAggt1AVj4x3wlwUaCVkS_F9dQfA-JWZ9HJmiQhSOSRXFov2y_xy4ifZPwpshwnFZm9Q"; // Replace this with the actual token

    const handleClick = (link: string) => {
        const url = `${link}?token=${encodeURIComponent(token)}`;
        window.location.href = url;
    };

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
                {modulesData.reduce((acc: Module[][], module, index) => {
                    const chunkIndex = Math.floor(index / 15);

                    if (!acc[chunkIndex]) {
                        acc[chunkIndex] = []; // start a new chunk
                    }

                    acc[chunkIndex].push(module);

                    return acc;
                }, []).map((chunk, slideIndex) => (
                    <SwiperSlide key={slideIndex}>
                        <div className="grid grid-cols-2 grid-rows-3 gap-x-4 gap-y-3 lg:grid-cols-5">
                            {chunk.map((module) => (
                                <div
                                    key={module.id}
                                    className="bg-[#508C9B] w-[200px] flex items-center justify-center rounded-lg text-white lg:w-[250px] xl:w-[330px] cursor-pointer"
                                    onClick={() => handleClick(module.link)}
                                >
                                    <div>
                                        <img
                                            src={module.image}
                                            alt={module.name}
                                            className="rounded-t-lg w-[200px] h-[120px] xl:h-[180px] lg:w-[250px] xl:w-[330px]"
                                        />
                                        <h3 className="text-center mt-1 mb-1.5">{module.name}</h3>
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
