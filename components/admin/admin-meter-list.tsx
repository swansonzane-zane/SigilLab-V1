type MeterListItem = {
  label: string;
  value: number;
};

type AdminMeterListProps = {
  title: string;
  description: string;
  items: MeterListItem[];
};

export function AdminMeterList({
  title,
  description,
  items,
}: AdminMeterListProps) {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <div className="space-y-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
      <div>
        <h3 className="font-heading text-2xl text-stone-50">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-stone-300/74">
          {description}
        </p>
      </div>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-stone-200/84 capitalize">{item.label}</span>
              <span className="text-stone-300/68">{item.value}</span>
            </div>
            <div className="h-2 rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,#f4d7a1,#d6b3ff_54%,#86d9ff)]"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
