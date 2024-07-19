'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundForward } from "react-icons/io";

export default function ProgressButton({ href }) {
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isHovering) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) return prev + 8.67;
          else return 100;
        });
      }, 100);
    } else {
      clearInterval(timerRef.current);
      setProgress(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isHovering]);

  useEffect(() => {
    if (progress === 100) {
      router.push(href);
    }
  }, [progress, href, router]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      className="relative flex items-center justify-center w-24 h-24"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="absolute w-16 h-16 rounded-full border-4 border-white bg-white flex items-center justify-center p-2">
        <span className="text-orange-500 text-2xl"><IoIosArrowRoundForward size={30} /></span>
      </div>
      <div
        className="absolute w-full h-full rounded-full border-4"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.3)',
        }}
      />
      <div
        className="absolute w-full h-full rounded-full border-4"
        style={{
          borderColor: `rgba(255, 255, 255, ${progress / 100})`,
          transition: 'border-color 0.1s linear',
        }}
      />
    </div>
  );
}
