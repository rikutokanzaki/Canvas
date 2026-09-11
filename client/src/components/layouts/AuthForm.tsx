"use client";

import { SubmitEvent, useState } from "react";

const inputClass =
  "mt-5 mb-2 w-full rounded-lg border border-gray-200 bg-gray-100 px-5 py-2.5 text-md outline-emerald-800 focus:outline-none focus:outline-offset-1";
const submitClass =
  "mt-4 cursor-pointer rounded-lg border border-emerald-800 bg-emerald-800 px-5 py-2.5 text-md text-amber-50 hover:bg-emerald-600";
const toggleButtonClass =
  "my-5 cursor-pointer rounded-lg border border-amber-50 bg-emerald-800 px-5 py-2.5 text-md text-amber-50 hover:bg-emerald-600";

export const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const preventSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div
      aria-label="Authentication"
      className="relative min-h-130 min-w-200 overflow-hidden rounded-xl bg-amber-50 shadow-md"
    >
      <div
        className={`absolute inset-y-0 left-0 z-20 flex w-1/2 flex-col items-center justify-center px-10 text-center transition-all duration-700 ease-in-out will-change-transform ${isSignUp ? "pointer-events-none -translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
      >
        <h1 className="my-5 text-3xl">Sign In</h1>
        <form className="w-full" onSubmit={preventSubmit}>
          <input required name="username" placeholder="username" type="text" className={inputClass} />
          <input required name="password" placeholder="password" type="password" className={inputClass} />
          <button type="submit" className={submitClass}>ログイン</button>
        </form>
      </div>

      <div
        className={`absolute inset-y-0 left-1/2 z-20 flex w-1/2 flex-col items-center justify-center px-10 text-center transition-all duration-700 ease-in-out will-change-transform ${isSignUp ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0"
          }`}
      >
        <h1 className="my-5 text-3xl">Sign Up</h1>
        <form className="w-full" onSubmit={preventSubmit}>
          <input required name="email" placeholder="email" type="email" className={inputClass} />
          <input required name="username" placeholder="username" type="text" className={inputClass} />
          <input required name="password" placeholder="password" type="password" className={inputClass} />
          <button type="submit" className={submitClass}>サインアップ</button>
        </form>
      </div>

      <div
        className={`absolute inset-y-0 left-1/2 z-30 flex w-1/2 items-center justify-center overflow-hidden rounded-l-[80px] rounded-r-none bg-emerald-800 px-4 text-center text-amber-50 transition-transform delay-100 duration-700 ease-in-out will-change-transform ${isSignUp ? "translate-x-full" : "translate-x-0"
          }`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h2 className="my-5 text-3xl">Welcome, back!</h2>
          <p className="text-md">...or looking to sign up?</p>
          <button type="button" onClick={() => setIsSignUp(true)} className={toggleButtonClass}>
            サインアップ
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-y-0 left-0 z-30 flex w-1/2 items-center justify-center overflow-hidden rounded-l-none rounded-r-[80px] bg-emerald-800 px-4 text-center text-amber-50 transition-transform delay-100 duration-700 ease-in-out will-change-transform ${isSignUp ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-full w-full flex-col items-center justify-center">
          <h2 className="my-5 text-3xl">Hi, there!</h2>
          <p className="text-md">...or returning user?</p>
          <button type="button" onClick={() => setIsSignUp(false)} className={toggleButtonClass}>
            ログイン
          </button>
        </div>
      </div>
    </div>
  );
}
