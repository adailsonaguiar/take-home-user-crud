"use client";
import { Header } from "@/components/Header";
import { logout } from "@/services/auth";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const MainTemplate = ({ children }: Props) => {
  const isAuthenticated = () => !!localStorage.getItem("token");
  const showHeader = isAuthenticated();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {showHeader && <Header onSignOut={() => logout()} />}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
};
