'use client';

import React, { useState } from 'react';
import ProgressButton from '../components/ProgressButton';
import Link from 'next/link';
import { IoIosArrowRoundForward } from "react-icons/io";

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage < 3 ? prevPage + 1 : prevPage));
  };

  const pages = [
    {
      id: 1,
      image: '/onboarding1.svg',
      title: 'We serve incomparable delicacies',
      description: 'All the best restaurants with their top menu waiting for you, they can’t wait for your order!!',
    },
    {
      id: 2,
      image: '/onboarding2.svg',
      title: 'We serve incomparable delicacies',
      description: 'All the best restaurants with their top menu waiting for you, they can’t wait for your order!!',
    },
    {
      id: 3,
      image: '/onboarding3.svg',
      title: 'We serve incomparable delicacies',
      description: 'All the best restaurants with their top menu waiting for you, they can’t wait for your order!!',
    },
  ];

  const renderDots = () => {
    return (
      <div className="flex justify-center my-3">
        {pages.map((page) => (
          <div
            key={page.id}
            className={`h-2 w-6 rounded-3xl mx-1 ${
              currentPage === page.id ? 'bg-white' : 'bg-[#C2C2C2]'
            }`}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-[430px] h-[932px] overflow-hidden sm:rounded-[2.5rem]">
        <img
          src={pages[currentPage - 1].image}
          className="w-full h-full object-cover"
          alt="onboarding"
        />
        <div className="absolute bottom-10 bg-[#FE8C00] p-6 m-10 text-center rounded-[2.5rem]">
          <h1 className="text-white text-[32px] font-semibold mb-2 leading-10">
            {pages[currentPage - 1].title}
          </h1>
          <p className="text-white text-sm">
            {pages[currentPage - 1].description}
          </p>
          {renderDots()}
          <div className="flex justify-between items-center text-white mt-24">
            {currentPage < 3 ? (
              <>
                <Link href="/loginPage">
                  <div className="hover:underline cursor-pointer">Skip</div>
                </Link>
                <div className="cursor-pointer flex items-center space-x-1" onClick={handleNext}>
                  <span>Next</span>
                  <span>
                    <IoIosArrowRoundForward size={30} />
                  </span>
                </div>
              </>
            ) : (
              <div className="flex justify-center w-full">
                <Link href="/loginPage">
                  <ProgressButton href="/loginPage" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
