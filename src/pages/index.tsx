import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import Employee from "./employees";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
const handleButton = () => { 
  router.push('/employees')
}
  return (
    <div className="flex justify-center items-center">
    <button onClick={handleButton} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Our Employees
    </button>
  </div>
  );
}
