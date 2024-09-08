"use client";

import { useEffect, useState  } from 'react';

const UserProfile = () => {
    const [userState, setUserState] = useState<any>(null);

    useEffect(() => {
        // Retrieve userState from local storage
        const storedUserState = localStorage.getItem('userState');
        if (storedUserState) {
            setUserState(JSON.parse(storedUserState));
        }
    }, []);

    if (!userState) {
        return <div>Loading...</div>; // You can replace this with a spinner or loading indicator
    }

    return (
        <div className="bg-[#1B3483] h-full flex-1">
            <div className="w-10/12 h-[200px] xl:h-[250px] bg-cover bg-center rounded-lg mx-auto mt-8 flex flex-col justify-center items-center"
                 style={{backgroundImage: 'url("/profile/Frame 8577.svg")'}}>
                <img src={userState.image} alt="Profile" className="w-24 xl:w-28 h-24 xl:h-28 rounded-full mb-4"/>
                <h2 className="text-white text-lg xl:text-xl font-bold">{`${userState.firstName} ${userState.lastName}`}</h2>
                <p className="text-white text-sm lg:text-lg">Software Developer at BrainKets</p>
            </div>

            {/* White box with two columns of text */}
            <div className="w-10/12 h-[320px] xl:h-[450px] bg-white mt-3 mx-auto rounded-lg flex ">
                <div className="w-1/2 p-5 pl-8 text-sm xl:text-xl">
                    <p className="text-[#A4A4A4]">User Information</p>
                    <p className="text-black font-semibold pt-3">Name</p>
                    <p className="text-black font-medium">{`${userState.firstName} ${userState.lastName}`}</p>
                    <p className="text-black font-semibold pt-6">Email</p>
                    <p className="text-black font-medium">{userState.email}</p>
                    <p className="text-black font-semibold pt-6">Phone</p>
                    <p className="text-black font-medium">{userState.phoneNumber}</p>
                    <p className="text-[#A4A4A4] pt-4">Password</p>
                    <p className="text-black font-medium pt-3">********</p>
                </div>
                <div className="w-1/2 p-5 pl-10 text-sm xl:text-xl">
                    {/* Right column with 5 texts */}
                    <p className="text-[#A4A4A4]">Social Media Links</p>
                    <div className="flex items-center mt-4 mb-2">
                        <img src="/path-to-your-icon3.svg" alt="Icon 3" className="w-6 h-6 mr-3"/>
                        <div>
                            <p className="text-black font-medium">https://www.facebook.com</p>
                        </div>
                    </div>
                    {/* Add more social media links as necessary */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
