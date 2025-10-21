'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "./navbar/navbar_welcome";

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-[#E6F0FF] to-[#F3F7FF] h-screen flex flex-col md:flex-row justify-center items-center px-6">
      <Navbar navbar_word={"Get started! 🚀"}/>
      {/* Left Section - Text */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center md:text-left max-w-lg mt-80 sm:mt-0"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#004AAD] mb-4">
          Welcome to{" "}
          <span className="inline-flex items-center">
            <span className="text-[#0070F3]">D</span>
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="Doingo logo"
              className="mx-1"
            />
            <span className="text-[#0070F3]">ingo</span>
          </span>{" "}

        </h1>

        <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
          🌍 Organize your world, 🎯 chase your goals, and 💪 conquer your day —
          one task at a time.
          🚀 Your productivity journey starts right here. ✨
        </p>

        <button onClick={() => window.location.href = '/todo'} className="bg-[#0070F3] hover:bg-[#0058C2] text-white font-semibold py-3 px-8 rounded-2xl shadow-lg transition-all cursor-pointer">
          Get Started 🚀
        </button>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-10 md:mt-0 md:ml-10"
      >
        <Image
          src="/todo_img.jpg"
          height={420}
          width={420}
          alt="Organize your tasks"
          className="rounded-2xl shadow-2xl border-4 border-[#0070F3]/10"
        />
      </motion.div>
    </div>
  );
}
