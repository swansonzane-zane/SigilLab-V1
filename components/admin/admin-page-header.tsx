type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <header className="space-y-3">
      <p className="text-[11px] tracking-[0.32em] text-sky-100/62 uppercase">
        {eyebrow}
      </p>
      <h1 className="font-heading text-4xl leading-tight font-semibold text-stone-50 sm:text-5xl">
        {title}
      </h1>
      <p className="max-w-3xl text-sm leading-7 text-stone-300/78 sm:text-base">
        {description}
      </p>
    </header>
  );
}
