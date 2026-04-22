type AdminStatCardProps = {
  label: string;
  value: string;
  note: string;
};

export function AdminStatCard({ label, value, note }: AdminStatCardProps) {
  return (
    <article className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.03))] p-5 backdrop-blur-sm">
      <p className="text-[11px] tracking-[0.28em] text-stone-300/58 uppercase">
        {label}
      </p>
      <p className="mt-4 font-heading text-4xl font-semibold text-stone-50">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-stone-300/74">{note}</p>
    </article>
  );
}
