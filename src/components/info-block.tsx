import Link from "next/link";

const InfoBlock = ({
  title,
  number,
  href,
}: {
  title: string;
  number: number;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="flex h-64 w-64 flex-col items-center gap-12 rounded-lg bg-slate-300 p-16 text-3xl duration-300 ease-in-out hover:scale-110 dark:bg-zinc-800"
    >
      <span className="text-7xl">{number}</span>
      <span>{title}</span>
    </Link>
  );
};

export { InfoBlock };
