import React from 'react';
import Link from 'next/link';

const Page3 = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-[430px] h-[932px] overflow-hidden">
        <img src="/onboarding3.svg" className="w-full h-full object-cover" alt="onboarding" />
        <div className="absolute bottom-0 bg-[#FE8C00] p-6 m-10 text-center rounded-[2.5rem]">
          <h1 className="text-white text-2xl font-bold mb-2">We serve incomparable delicacies</h1>
          <p className="text-white text-sm">
            All the best restaurants with their top menu waiting for you, they can’t wait for your order!!
          </p>
          <div className="flex justify-center my-3">
            <span className="h-2 w-6 bg-[#C2C2C2] rounded-3xl mx-1"></span>
            <span className="h-2 w-6 bg-[#C2C2C2] rounded-3xl mx-1"></span>
            <span className="h-2 w-6 bg-white rounded-3xl mx-1"></span>
          </div>
          <div className="flex justify-between text-white mt-10">
            <Link href="/onboarding/page2">
              <div className="hover:underline">Back</div>
            </Link>
            <Link href="/login">
              <div className="hover:underline">Get Started</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page3;
