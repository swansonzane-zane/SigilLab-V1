import Link from "next/link";

type LaunchStateProps = {
  eyebrow: string;
  title: string;
  message: string;
  actionLabel: string;
  actionHref?: string;
};

export function LaunchState({
  eyebrow,
  title,
  message,
  actionLabel,
  actionHref = "/",
}: LaunchStateProps) {
  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.14),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.18),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <p className="text-sm tracking-[0.32em] text-stone-300/58 uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-none text-amber-50">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-300/80">
          {message}
        </p>
        <Link
          href={actionHref}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-sm bg-[linear-gradient(135deg,#9d2b20,#6f1711_54%,#2a1711)] px-6 text-sm font-semibold text-[#fff4d6] transition hover:brightness-110"
        >
          {actionLabel}
        </Link>
      </div>
    </main>
  );
}
