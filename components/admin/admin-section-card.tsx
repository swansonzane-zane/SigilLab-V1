type AdminSectionCardProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function AdminSectionCard({
  title,
  description,
  children,
}: AdminSectionCardProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(18,19,35,0.9),rgba(8,9,18,0.96))] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.26)] backdrop-blur-sm">
      <div className="mb-5">
        <h2 className="font-heading text-2xl font-semibold text-stone-50">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm leading-6 text-stone-300/74">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
