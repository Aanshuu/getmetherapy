'use client';
import { useState } from "react";
import Link from "next/link";
import { auth, signInWithGoogleHandler } from "../firebase";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegisterPage() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordHandler = () => {
    setShowPassword((prev) => !prev);
  };

  const changeUserDetailsHandler = (event) => {
    const { name, value } = event.target;

    setUserDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const submitSignupHandler = async (event) => {
    event.preventDefault();
    const { username, password } = userDetails;

    if (username.trim().length === 0 || password.trim().length < 8) return;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );

      const token = await response.user.getIdToken();

      const userData = {
        name: response.user.displayName,
        email: response.user.email,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("userdata", JSON.stringify(userData));
    } catch (error) {
      console.error("Error creating User: ", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="relative w-[430px] h-[932px] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white p-8 rounded-[2.5rem]">
            <div className="w-full space-y-6">
              <div className="space-y-2 text-center">
                <h2 className="text-3xl font-bold text-gray-900 text-left">
                  Create your new <br /> account
                </h2>
                <p className="text-sm text-gray-600 text-left">
                  Create an account to start looking for the food you like
                </p>
              </div>
              <form onSubmit={submitSignupHandler} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={userDetails.email}
                    onChange={changeUserDetailsHandler}
                    className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                    placeholder="Enter Email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    User Name
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={changeUserDetailsHandler}
                    className="block w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-black"
                    placeholder="Username"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={userDetails.password}
                    onChange={changeUserDetailsHandler}
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
                <div className="flex gap-1 items-start">
                  <input type="checkbox" className="mt-1" />
                  <p className="text-sm text-black">
                    I Agree with{" "}
                    <span className="text-[#FE8C00]">Terms of Service</span>{" "}
                    and{" "}
                    <span className="text-[#FE8C00]">Privacy Policy</span>{" "}
                  </p>
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white bg-[#FE8C00] rounded-3xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Register
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
                  onClick={signInWithGoogleHandler}
                  className="cursor-pointer"
                />
              </div>
              <div className="flex items-center justify-center mt-6">
                <span className="text-sm text-gray-500">Have an account?</span>
                <Link
                  href="/loginPage"
                  className="ml-1 text-sm font-medium text-orange-600 hover:text-orange-500"
                >
                  {" "}
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
