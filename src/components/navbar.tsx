"use client";

import { Calendar, CreditCardIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { ModeToggle } from "@/components/mode-toggle";
import { useActivePath } from "@/hooks/useActivePath";

export const Navbar = () => {
  const checkActivePath = useActivePath();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <header className="relative z-50 h-20 border-b border-white/10 backdrop-blur-[12px] md:border-none">
      {/* Mobile Menu Icon */}

      <div className="flex h-20 items-center justify-between md:hidden">
        <h2 className="pl-8 text-2xl">Personal Planer</h2>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <button
            onClick={toggleMenu}
            className="pr-2 text-black focus:outline-none dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen ? (
        <div className="animate-fade-in absolute left-0 top-full w-full bg-white shadow-lg dark:bg-black md:hidden">
          <ul className="flex flex-col text-center uppercase dark:text-white">
            <li
              className={`p-4 ${
                checkActivePath("/") ? "bg-slate-200 dark:bg-zinc-700" : ""
              }`}
            >
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li
              className={`p-4 ${
                checkActivePath("/spendings")
                  ? "bg-slate-200 dark:bg-zinc-700"
                  : ""
              }`}
            >
              <Link href="/spendings" onClick={() => setIsMenuOpen(false)}>
                Spendings
              </Link>
            </li>
            <li
              className={`p-4 ${
                checkActivePath("/calendar")
                  ? "bg-slate-200 dark:bg-zinc-700"
                  : ""
              }`}
            >
              <Link href="/calendar" onClick={() => setIsMenuOpen(false)}>
                Calendar
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
      <div className="hidden flex-col justify-between md:flex">
        <nav className="flex flex-col items-start p-3">
          <ModeToggle />
          <Link
            href="/"
            className={`mt-2 w-full rounded-lg p-4 text-xl hover:opacity-80 ${
              checkActivePath("/") ? "bg-slate-200 dark:bg-zinc-700" : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <HomeIcon />
              Home
            </div>
          </Link>
          <Link
            href="/spendings"
            className={`mt-2 w-full rounded-lg p-4 text-xl hover:opacity-80 ${
              checkActivePath("/spendings")
                ? "bg-slate-200 dark:bg-zinc-700"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <CreditCardIcon />
              Spendings
            </div>
          </Link>
          <Link
            href="/calendar"
            className={`mt-2 w-full rounded-lg p-4 text-xl hover:opacity-80 ${
              checkActivePath("/calendar")
                ? "bg-slate-200 dark:bg-zinc-700"
                : ""
            }`}
          >
            <div className="flex items-center gap-4">
              <Calendar />
              Calendar
            </div>
          </Link>
        </nav>
      </div>
    </header>
  );
};
