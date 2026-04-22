type ResultSigilProps = {
  intent: string;
};

export function ResultSigil({ intent }: ResultSigilProps) {
  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      <div className="absolute inset-8 rounded-full bg-[radial-gradient(circle,_rgba(251,191,36,0.34),_rgba(168,85,247,0.14)_42%,_rgba(14,165,233,0.08)_65%,_transparent_78%)] blur-2xl" />
      <div className="absolute inset-0 rounded-full border border-white/8 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-sm" />
      <div className="absolute inset-5 rounded-full border border-amber-200/18" />
      <div className="absolute inset-10 rounded-full border border-sky-200/12" />
      <div className="absolute inset-16 rounded-full border border-violet-200/15" />
      <div className="absolute h-px w-56 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
      <div className="absolute h-56 w-px bg-gradient-to-b from-transparent via-white/35 to-transparent" />
      <div className="absolute h-44 w-44 rotate-45 border border-white/10" />
      <div className="absolute h-28 w-28 rounded-full border border-amber-100/35" />
      <svg
        aria-hidden="true"
        viewBox="0 0 240 240"
        className="relative h-52 w-52 text-stone-100/88 drop-shadow-[0_0_30px_rgba(245,158,11,0.25)]"
      >
        <circle
          cx="120"
          cy="120"
          r="88"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.16"
          strokeWidth="1.5"
        />
        <circle
          cx="120"
          cy="120"
          r="54"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.26"
          strokeWidth="1.5"
        />
        <path
          d="M120 42 L144 96 L198 120 L144 144 L120 198 L96 144 L42 120 L96 96 Z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.72"
          strokeWidth="1.8"
        />
        <path
          d="M120 72 L166 120 L120 168 L74 120 Z"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.58"
          strokeWidth="1.8"
        />
        <circle cx="120" cy="120" r="10" fill="currentColor" fillOpacity="0.92" />
        <path
          d="M120 58 C152 58 182 88 182 120 C182 152 152 182 120 182 C88 182 58 152 58 120 C58 88 88 58 120 58"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.32"
          strokeWidth="1.1"
          strokeDasharray="5 8"
        />
      </svg>
      <div className="absolute bottom-6 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-[11px] tracking-[0.34em] text-stone-300/70 uppercase">
        {intent}
      </div>
    </div>
  );
}
