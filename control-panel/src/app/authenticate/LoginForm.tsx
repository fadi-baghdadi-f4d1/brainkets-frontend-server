"use client";

import React, { useState, useEffect } from "react";
import { IoMdLock, IoMdEyeOff, IoMdEye } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cookie from "cookie";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { setCookie } from "nookies";
import LanguageDropdown from "./LanguageDropdown";
import { login } from "../services/users/login/LoginApi";
import ForgotPassword from "./ForgetPassword";
import Image from "next/image";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/userSlice';
import BeatLoader from "react-spinners/BeatLoader";

const LoginForm: React.FC = () => {
  const [locale, setLocale] = useState<string>("en");
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const t = useTranslations("login");

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookies = cookie.parse(document.cookie);
      setLocale(cookies["NEXT_LOCALE"] || "en");
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userName) {
      toast.error(t("usernameRequired"));
      setLoading(false);
      return;
    }

    if (!password) {
      toast.error(t("passwordRequired"));
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const data = await login(userName, password);

      dispatch(setUser({
        id: data.id,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        accessToken: data.accessToken,
        isLoggedIn: true,
        email: data.email,
        phoneNumber: data.phoneNumber,
        image: data.image,
        birthDate: data.birthDate,
        language: data.language,
        notificationsEnabled: data.notificationsEnabled,
        clockInTime: data.clockInTime,
        projectsCount: data.projectsCount,
        openTasksCount: data.openTasksCount,
        hrsLog: data.hrsLog,
        singlePersonalProjectId: data.singlePersonalProjectId,
        leaves: data.leaves,
        designation: data.designation,
      }));

      if (typeof window !== 'undefined') {
        localStorage.setItem('userState', JSON.stringify({
          id: data.id,
          userName: data.userName,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          image: data.image,
          role: data.role,
          birthDate: data.birthDate,
          accessToken: data.accessToken,
          language: data.language,
          notificationsEnabled: data.notificationsEnabled,
          clockInTime: data.clockInTime,
          projectsCount: data.projectsCount,
          openTasksCount: data.openTasksCount,
          hrsLog: data.hrsLog,
          singlePersonalProjectId: data.singlePersonalProjectId,
          leaves: data.leaves,
          designation: data.designation,
          isLoggedIn: true,
        }));
      }

      const maxAge = rememberMe ? 30 * 24 * 60 * 60 : undefined;
      setCookie(null, "accessToken", data.accessToken, {
        maxAge,
        path: "/",
      });

      setTimeout(() => {
        router.push(`/home`);
      }, 500);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast.error(("Wrong Credentials"));
        setLoading(false);
      } else {
        toast.error(error.response?.data?.message || ("Login Failed"));
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
      <div className="flex flex-col items-center justify-center rounded-md">
        <div className=" rounded-xl shadow-lg w-full max-w-md mx-auto h-450 relative">
          <div
              className=" bg-transparent h-[180px] rounded-t-xl w-full max-w-md flex flex-col justify-center items-center relative">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-semibold mb-4 text-white">
                {("Brain Space")}
              </h2>
              <h2
                  className="text-4xl font-semibold text-white -mt-6 transform rotate-180"
                  style={{
                    transform: 'scaleY(-1)',
                    opacity: 0.25,
                    background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
              >
                {("Brain Space")}
              </h2>
            </div>
            <img
                src="/login/Group%202.png"
                alt="Description"
                className="absolute bottom-6 right-4 object-contain"
            />
          </div>

          <form className="space-y-6 p-10 bg-white bg-opacity-80" onSubmit={handleSubmit}>
            <div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type="text"
                    name="userName"
                    id="userName"
                    className="block text-black w-full h-12 rounded-lg pl-16 pr-3 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                    placeholder={("username")}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <div
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                  <Image
                      alt="message"
                      src={"/login/Frame 6,png"}
                      width={10}
                      height={24}
                      className="h-4 w-4"
                  />
                </div>
                <div className="absolute rounded-l-lg bg-[#B6B6B6] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                  <MdEmail className="text-white text-2xl" />
                </div>
              </div>
            </div>
            <div>

              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="block text-black w-full h-12 rounded-lg pl-16 pr-10 py-2 border border-[#AEAEAE] leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FDC90E] focus:border-[#FDC90E] sm:text-sm"
                    placeholder={("password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute rounded-l-lg bg-[#B6B6B6] inset-y-0 left-0 px-4 flex items-center pointer-events-none">
                  <IoMdLock className="text-white text-2xl" />
                </div>
                <div
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                      <IoMdEyeOff className="text-xl text-[#AEAEAE]" />
                  ) : (
                      <IoMdEye className="text-xl text-[#AEAEAE]" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="h-4 w-4 border-[#999999] rounded"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label
                    htmlFor="remember"
                    className="ml-2 block font-medium text-sm text-[#999999]"
                >
                  {("Remember Me")}
                </label>
              </div>
              <div className="flex items-center">
                <button
                    type="button"
                    className="text-sm text-[#1890FF] transition duration-200"
                    onClick={handleForgotPassword}
                >
                  {("Forgot Password?")}
                </button>
              </div>
            </div>
            <div>
              <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
              shadow-sm text-md font-semibold text-white bg-[#1890FF] hover:shadow-md hover:shadow-gray-400"
              >
                {loading ? (
                    <BeatLoader color="black" size={8} />
                ) : (
                    ("Login")
                )}
              </button>
            </div>
          </form>
        </div>
        {showModal && <ForgotPassword onClose={closeModal} />}
      </div>
  );
};

export default LoginForm;
