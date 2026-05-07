"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.14),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.18),_transparent_20%),linear-gradient(180deg,#15100c,#050403)]"
      />
      <div className="relative mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-10 text-center">
        <p className="text-sm tracking-[0.32em] text-stone-300/58 uppercase">
          Reading Interrupted
        </p>
        <h1 className="mt-5 font-heading text-5xl leading-none text-amber-50">
          The signal slipped.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-stone-300/80">
          Something failed while opening this path. Try once more, or return home
          and begin again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[linear-gradient(135deg,#e5c98c,#b08d57_48%,#7a1b14)] px-6 text-sm font-semibold text-[#160d08] transition hover:brightness-105"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-[#80623c]/28 bg-[#120b08]/72 px-6 text-sm font-semibold text-stone-100 transition hover:bg-white/[0.08]"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
