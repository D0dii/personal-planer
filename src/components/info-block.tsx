import Link from "next/link";

const InfoBlock = ({ title, number, href }: { title: string; number: number; href: string }) => {
  return (
    <Link
      href={href}
      className="p-16 dark:bg-zinc-800 bg-slate-300 rounded-lg text-3xl h-64 w-64 flex flex-col items-center gap-12 hover:scale-110 ease-in-out duration-300"
    >
      <span className="text-7xl">{number}</span>
      <span>{title}</span>
    </Link>
  );
};

export { InfoBlock };
