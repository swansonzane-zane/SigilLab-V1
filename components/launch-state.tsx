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
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.22),_transparent_34%)]"
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
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-6 text-sm font-semibold text-slate-950 transition hover:brightness-105"
        >
          {actionLabel}
        </Link>
      </div>
    </main>
  );
}
