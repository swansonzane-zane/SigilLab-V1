import Link from "next/link";

type ResultActionBarProps = {
  birthDate: string;
};

export function ResultActionBar({ birthDate }: ResultActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 border-t border-white/10 bg-[rgba(6,7,14,0.86)] px-4 py-3 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-4xl gap-3">
        <Link
          href="/share"
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full border border-white/12 bg-white/[0.05] px-5 text-sm font-medium text-stone-100 transition hover:bg-white/[0.1]"
        >
          Share
        </Link>
        <Link
          href={`/?birthDate=${birthDate}`}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        >
          Regenerate
        </Link>
      </div>
    </div>
  );
}
