"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminNavItems = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
  },
  {
    href: "/admin/readings",
    label: "Readings",
  },
  {
    href: "/admin/prompts",
    label: "Prompts",
  },
  {
    href: "/admin/ai-providers",
    label: "AI Providers",
  },
  {
    href: "/admin/configs",
    label: "Configs",
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(17,18,31,0.95),rgba(9,10,19,0.98))] p-4 shadow-[0_24px_90px_rgba(0,0,0,0.3)] backdrop-blur-xl lg:sticky lg:top-6 lg:w-72 lg:self-start">
      <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-amber-200 shadow-[0_0_14px_rgba(252,211,77,0.85)]" />
        <div>
          <p className="text-[11px] tracking-[0.28em] text-stone-300/60 uppercase">
            SigilLab
          </p>
          <p className="font-heading text-2xl text-stone-50">Admin</p>
        </div>
      </div>

      <nav className="space-y-2">
        {adminNavItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition",
                isActive
                  ? "border-amber-200/35 bg-amber-100/10 text-amber-50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
                  : "border-white/8 bg-white/[0.03] text-stone-300/84 hover:border-white/15 hover:bg-white/[0.05]",
              ].join(" ")}
            >
              <span>{item.label}</span>
              <span
                className={[
                  "h-2 w-2 rounded-full",
                  isActive ? "bg-amber-200" : "bg-white/12",
                ].join(" ")}
              />
            </Link>
          );
        })}
      </nav>

      <div className="mt-6 rounded-2xl border border-white/8 bg-black/20 p-4">
        <p className="text-[11px] tracking-[0.28em] text-stone-300/55 uppercase">
          Control Surface
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-300/78">
          Reading ops, prompt hygiene, provider posture, and runtime tuning live
          here.
        </p>
      </div>
    </aside>
  );
}
