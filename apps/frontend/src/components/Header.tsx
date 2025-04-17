import React from "react";

type HeaderProps = {
  onSignOut: () => void;
};

export const Header = ({ onSignOut }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">THU CRUD</h1>
      <button
        onClick={onSignOut}
        className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
      >
        Sign Out
      </button>
    </header>
  );
};
