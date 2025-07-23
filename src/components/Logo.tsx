"use client";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/");
      }}
      className="flex justify-center items-center cursor-pointer"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6C13 6 8 11 8 18C8 26 20 38 20 38C20 38 32 26 32 18C32 11 27 6 20 6ZM20 22C18.34 22 17 20.66 17 19C17 17.34 18.34 16 20 16C21.66 16 23 17.34 23 19C23 20.66 21.66 22 20 22Z"
          fill="currentColor"
          className="fill-primary"
        />
      </svg>

      <h1 className="text-2xl font-bold text-primary">Minbnb</h1>
    </div>
  );
};

export default Logo;
