'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from 'next/navigation';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { FaUserCircle } from "react-icons/fa";
import AnalogClock from "./Tracking/AnalogClock";
import ShareButton from "./Tracking/ShareButton";
import SpeedSlider from "./Tracking/SpeedSlider";

const API_KEY = process.env.NEXT_PUBLIC_QUOTE_API_KEY;
const QUOTE_API = process.env.NEXT_PUBLIC_QUOTE_API;

export default function TrackingPageContent() {
  const [speed, setSpeed] = useState(1);
  const [quote, setQuote] = useState("");
  const [fade, setFade] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const speedParam = searchParams.get("speed");
    if (speedParam) {
      setSpeed(parseFloat(speedParam));
    }
  }, [searchParams]);

  const userData = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("userdata") || "{}" : "{}");

  const toggleDropDown = () => {
    setShowDropDown((prev) => !prev);
  };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(QUOTE_API, {
          headers: {
            "X-Api-Key": API_KEY,
          },
        });

        const data = await response.json();
        setFade(false);
        setTimeout(() => {
          setQuote(data[0]?.quote);
          setFade(true);
        }, 500);
      } catch (error) {
        console.error(error);
      }
    };

    fetchQuote();

    const quoteInterval = setInterval(fetchQuote, 7000);

    return () => clearInterval(quoteInterval);
  }, []);

  const logoutHandler = async () => {
    await signOut(auth);
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    router.push('/loginPage');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-[430px] h-[932px] overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white p-8 sm:rounded-[2.5rem]">
          <div className="w-full space-y-10">
            <div className="relative top-0">
              {userData.profilePic ? (
                <img
                  src={userData.profilePic}
                  alt="ProfilePic"
                  className="rounded-full h-10 w-10 float-right cursor-pointer "
                  onClick={toggleDropDown}
                />
              ) : (
                <FaUserCircle
                  size={30}
                  className="float-right cursor-pointer bg-black"
                  onClick={toggleDropDown}
                />
              )}
              {showDropDown && (
                <ul className="z-10 absolute top-10 right-0 text-[12px] shadow-md p-4 rounded-xl bg-white text-black">
                  <li>{userData.name}</li>
                  <li>{userData.email}</li>
                  <li onClick={logoutHandler} className="cursor-pointer">
                    Logout
                  </li>
                </ul>
              )}
            </div>
            <div className="space-y-10 sm:pt-40 pt-10 flex flex-col items-center justify-center text-black">
              <AnalogClock speed={speed} />
              <SpeedSlider speed={speed} setSpeed={setSpeed} />
              <ShareButton speed={speed} />
            </div>
            <p
              className={`text-sm tracking-wide text-center transition-opacity duration-500 text-black ${
                fade ? "opacity-100" : "opacity-0"
              }`}
            >
              &quot;{quote}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
