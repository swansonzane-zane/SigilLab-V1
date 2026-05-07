"use client";

type TransitionLevel = "instant" | "ritual" | "feedback";

type TransitionOverlayProps = {
  level: TransitionLevel;
  title: string;
  message?: string;
};

export function TransitionOverlay({
  level,
  title,
  message,
}: TransitionOverlayProps) {
  if (level === "feedback") {
    return (
      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <div className="max-w-sm rounded-[1.2rem] border border-[#80623c]/24 bg-[linear-gradient(180deg,rgba(30,19,13,0.95),rgba(8,6,5,0.98))] px-5 py-4 text-center shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <p className="text-[11px] tracking-[0.12em] text-[#d8bd82]/76">
            Ritual Notice
          </p>
          <p className="mt-2 text-sm font-medium text-stone-50">{title}</p>
          {message ? (
            <p className="mt-2 text-sm leading-6 text-stone-300/82">{message}</p>
          ) : null}
        </div>
      </div>
    );
  }

  const isRitual = level === "ritual";

  return (
    <div className="pointer-events-auto fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,5,10,0.68)] px-5 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-[1.4rem] border border-[#80623c]/24 bg-[linear-gradient(180deg,rgba(30,19,13,0.95),rgba(8,6,5,0.98))] px-6 py-8 text-center shadow-[0_40px_140px_rgba(0,0,0,0.58)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(176,141,87,0.16),_transparent_24%),radial-gradient(circle_at_82%_18%,_rgba(122,31,23,0.18),_transparent_20%)]"
        />
        <div className="relative flex flex-col items-center">
          <div className="relative flex h-28 w-28 items-center justify-center">
            <div
              className={[
                "absolute inset-0 rounded-full border border-white/10",
                isRitual ? "animate-ping" : "animate-pulse",
              ].join(" ")}
            />
            <div className="absolute inset-3 rounded-full border border-amber-200/20" />
            <div className="absolute inset-7 rounded-full border border-[#7a1b14]/28" />
            <div className="absolute h-px w-20 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <div className="absolute h-20 w-px bg-gradient-to-b from-transparent via-white/40 to-transparent" />
            <div className="absolute h-12 w-12 rotate-45 border border-white/16" />
            <div className="h-3 w-3 rounded-full bg-amber-100 shadow-[0_0_22px_rgba(252,211,77,0.92)]" />
          </div>

          <p className="mt-5 text-[11px] tracking-[0.34em] text-stone-300/62 uppercase">
            {isRitual ? "Ritual In Motion" : "Passage"}
          </p>
          <h2 className="mt-3 font-heading text-3xl leading-none text-stone-50">
            {title}
          </h2>
          {message ? (
            <p className="mt-4 max-w-sm text-sm leading-7 text-stone-300/82">
              {message}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
