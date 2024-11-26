"use client";

import { Calendar, CreditCardIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/footer";
import { ModeToggle } from "@/components/mode-toggle";
import { useActivePath } from "@/hooks/useActivePath";

const Navbar = () => {
  const checkActivePath = useActivePath();
  return (
    <div className="flex flex-col justify-between">
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
            checkActivePath("/spendings") ? "bg-slate-200 dark:bg-zinc-700" : ""
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
            checkActivePath("/calendar") ? "bg-slate-200 dark:bg-zinc-700" : ""
          }`}
        >
          <div className="flex items-center gap-4">
            <Calendar />
            Calendar
          </div>
        </Link>
      </nav>
      <Footer />
    </div>
  );
};

export { Navbar };
