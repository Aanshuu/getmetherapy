'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import LoginSuccessPage from "../components/LoginSuccessPage";
import Link from 'next/link';

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [userData, setUserData] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = JSON.parse(localStorage.getItem("userdata") || "{}");
      setUserData(storedUserData);

      if (storedUserData?.email) {
        setLoginSuccess(true);
      }
    }
  }, []);

  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const changeLoginDetailsHandler = (event) => {
    const { name, value } = event.target;

    setLoginDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const loginSubmitHandler = async (event) => {
    event.preventDefault();

    if (
      loginDetails.email.trim().length === 0 ||
      loginDetails.password.trim().length < 8
    )
      return;

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );
      const token = await response.user.getIdToken();

      const userData = {
        email: response.user.email,
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("userdata", JSON.stringify(userData));
      }
      setLoginSuccess(true);
      router.push('/trackingPage');
    } catch (error) {
      console.log("Error Signing In: ", error);
    }
  };

  const signinWithGoogleHandler = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const { displayName, email, photoURL } = result.user;
        const token = await result.user.getIdToken();

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token);
          localStorage.setItem(
            "userdata",
            JSON.stringify({ name: displayName, email, profilePic: photoURL })
          );
        }
        setLoginSuccess(true);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {!loginSuccess ? (
      <div className="flex items-center justify-center h-screen bg-black">
          <div className="relative w-[430px] h-[932px] overflow-hidden">
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white p-8 sm:rounded-[2.5rem]">
              <div className="w-full space-y-6">
                <div className="space-y-2 text-center">
                  <h2 className="text-3xl font-medium text-gray-900 text-left text-[34px] mb-2 leading-10">Login to your account</h2>
                  <p className="text-sm text-gray-600 text-left">Please sign in to your account</p>
                </div>
                <form onSubmit={loginSubmitHandler} className="space-y-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-black">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={loginDetails.email}
                      onChange={changeLoginDetailsHandler}
                      className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                      placeholder="Enter Email"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginDetails.password}
                      onChange={changeLoginDetailsHandler}
                      className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                      placeholder="Password"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-6">
                      {showPassword ? (
                        <FaEye
                          className="text-black cursor-pointer"
                          onClick={togglePasswordHandler}
                        />
                      ) : (
                        <FaEyeSlash
                          className="text-black cursor-pointer"
                          onClick={togglePasswordHandler}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Link href="#" className="text-sm font-medium text-[#FE8C00] hover:text-orange-500">Forgot password?</Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-[#FE8C00] rounded-3xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    Sign In
                  </button>
                </form>
                <div className="flex items-center justify-center mt-6">
                  <div className="w-1/3 h-px bg-gray-300"></div>
                  <span className="text-sm text-gray-500 mx-3">Or sign in with</span>
                  <div className="w-1/3 h-px bg-gray-300"></div>
                </div>
                <div className="flex justify-center mt-2">
                  <FcGoogle
                    size={40}
                    onClick={signinWithGoogleHandler}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-center mt-6">
                  <span className="text-sm text-gray-500">Don&apos;t have an account?</span>
                  <Link href="/registerPage" className="ml-1 text-sm font-medium text-orange-600 hover:text-orange-500">Register</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        ) : (
          <LoginSuccessPage onLoginSuccess={setLoginSuccess} />
      )} 
    </>
  );
}
