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
        <div className="max-w-sm rounded-[1.7rem] border border-amber-100/16 bg-[linear-gradient(180deg,rgba(21,22,39,0.95),rgba(9,10,18,0.98))] px-5 py-4 text-center shadow-[0_28px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl">
          <p className="text-[11px] tracking-[0.28em] text-amber-100/72 uppercase">
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
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(20,21,40,0.95),rgba(7,8,16,0.98))] px-6 py-8 text-center shadow-[0_40px_140px_rgba(0,0,0,0.58)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.14),_transparent_24%),radial-gradient(circle_at_80%_20%,_rgba(125,211,252,0.12),_transparent_18%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.2),_transparent_32%)]"
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
            <div className="absolute inset-7 rounded-full border border-sky-200/16" />
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
