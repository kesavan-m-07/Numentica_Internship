import React, { useState, useEffect, useRef } from "react";
import { useLogout } from "../query/useLogout";

const ProfileSection = ({username}: {username: string}) => {
  const {mutate:logout,isPending} = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {

  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if(isPending) return <p>Logging Out....</p>

  return (
    <div ref={profileRef} className="relative hidden md:block">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2  cursor-pointer select-none"
      >
        <div className="bg-[#f0f4fc] w-9 h-9 rounded-full flex items-center justify-center">
          {username?.[0]?.toUpperCase()}
        </div>
        <div className="text-xs">
          <p className="font-light text-[10px]">welcome</p>
          <p className="font-semibold truncate w-14">{username}</p>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1em"
          height="1em"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            d="m19.142 9.929l-6.364 6.364a1 1 0 0 1-1.415 0L5 9.929"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-lg p-3 z-50 animate-scaleUp ">
          <p className="text-sm font-semibold">{username}</p>
          <hr className="my-2 border-gray-300" />
          <button
            onClick={() => logout()}
            className="bg-red-500 w-full text-xs text-white py-1 rounded-2xl cursor-pointer"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileSection;
