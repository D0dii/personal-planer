import Link from "next/link";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="flex p-3 items-center justify-end">
      <Link href="/" className="p-4 hover:opacity-80 text-xl">
        Home
      </Link>
      <Link href="/spendings" className="p-4 hover:opacity-80 text-xl">
        Spendings
      </Link>
      <Link href="/calendar" className="p-4 hover:opacity-80 text-xl">
        Calendar
      </Link>
      <ModeToggle />
    </nav>
  );
};

export { Navbar };
