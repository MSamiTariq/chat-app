"use client";

import React from "react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex flex-col bg-gray-100 min-h-screen justify-center align-center">
      <div className="flex flex-col items-center justify-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to ChatZone!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Connect with your friends and family in real-time with our easy-to-use
          chatting application.
        </p>
        <div className="flex space-x-4">
          <button
            type="button"
            className="rounded-md bg-purple-600 px-4 py-2 text-white font-bold shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Link href="/login">Login</Link>
          </button>
          <button
            type="button"
            className="rounded-md bg-purple-600 px-4 py-2 text-white font-bold shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <Link href="/signup">Sign Up</Link>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-lg text-gray-600 mt-4">
          Start a conversation with anyone, anywhere, anytime.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
