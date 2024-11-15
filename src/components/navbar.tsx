"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Footer } from "@/components/footer";
import { useActivePath } from "@/hooks/useActivePath";
import { Calendar, CreditCardIcon, HomeIcon } from "lucide-react";

const Navbar = () => {
  const checkActivePath = useActivePath();
  return (
    <div className="flex flex-col justify-between">
      <nav className="flex flex-col p-3 items-start">
        <ModeToggle />
        <Link
          href="/"
          className={`p-4 hover:opacity-80 text-xl w-full rounded-lg mt-2 ${
            checkActivePath("/") ? "dark:bg-zinc-700 bg-slate-200" : ""
          }`}
        >
          <div className="flex gap-4 items-center">
            <HomeIcon />
            Home
          </div>
        </Link>
        <Link
          href="/spendings"
          className={`p-4 hover:opacity-80 text-xl w-full rounded-lg mt-2 ${
            checkActivePath("/spendings") ? "dark:bg-zinc-700 bg-slate-200" : ""
          }`}
        >
          <div className="flex gap-4 items-center">
            <CreditCardIcon />
            Spendings
          </div>
        </Link>
        <Link
          href="/calendar"
          className={`p-4 hover:opacity-80 text-xl w-full rounded-lg mt-2 ${
            checkActivePath("/calendar") ? "dark:bg-zinc-700 bg-slate-200" : ""
          }`}
        >
          <div className="flex gap-4 items-center">
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
