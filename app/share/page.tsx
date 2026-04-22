import Link from "next/link";

export default function SharePage() {
  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.12),_transparent_22%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.2),_transparent_34%)]"
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <div className="space-y-5 rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(18,19,35,0.94),rgba(8,9,18,0.98))] p-8 shadow-[0_24px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <p className="text-sm tracking-[0.3em] text-amber-100/88 uppercase">
            SigilLab Share
          </p>
          <h1 className="font-heading text-4xl font-semibold text-stone-50 sm:text-5xl">
            Sharing will be prepared in a later ritual.
          </h1>
          <p className="text-base leading-7 text-stone-300/82">
            For now, you can return to your reading or begin a new signal.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/result"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-sm font-medium text-stone-100 transition hover:bg-white/[0.08]"
            >
              Back to Result
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#f4d7a1,#d6b3ff_54%,#86d9ff)] px-5 py-3 text-sm font-semibold text-slate-950 transition hover:brightness-105"
            >
              New Reading
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
