'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { CgLoadbar } from "react-icons/cg";

export default function LoginSuccessPage({ onLoginSuccess }) {
  const router = useRouter();

  const logoutHandler = async () => {
    await signOut(auth);
    if (typeof window !== "undefined") {
      localStorage.clear();
    }
    onLoginSuccess(false);
    router.push('/loginPage');
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative w-[430px] h-[932px] overflow-hidden sm:rounded-[2.5rem]">
        <img
          src='/onboarding1.svg'
          className="w-full h-full object-cover"
          alt="Onboarding Background"
        />
        <div className="absolute bottom-0 bg-[white] p-6 text-center rounded-t-[2.5rem] w-[430px] h-[532px] animate-slide-up">
          <div className='flex items-center justify-center -mt-6 mb-4'>
          <div className='transform scale-x-150'>
            <CgLoadbar className='text-[#00000033] text-5xl' />
          </div>
          </div>
          <Image src='/Success.svg' alt="Success" className="mx-auto" width={200} height={170} />
          <h2 className="text-black text-2xl font-bold mt-10">Login Successful</h2>
          <p>
            <button
              onClick={() => router.push('/trackingPage')}
              className="text-white bg-[#FE8C00] w-full p-3 rounded-full mt-10"
            >
              Go to Tracking Screen
            </button>
          </p>
          <button onClick={logoutHandler} className="text-[#878787] mt-6">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
