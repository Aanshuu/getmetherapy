import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our App</h1>
      <div className="flex space-x-4">
        <Link href="/onboarding/page1">
          <div className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Get Started</div>
        </Link>
      </div>
    </div>
  )
}
