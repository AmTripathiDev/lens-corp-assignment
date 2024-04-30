import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState } from "react";
import Login from "./admin";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Login />
    </div>
  );
}
