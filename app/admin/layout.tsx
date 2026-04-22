import type { ReactNode } from "react";

import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,215,138,0.08),_transparent_22%),radial-gradient(circle_at_85%_16%,_rgba(125,211,252,0.1),_transparent_16%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.16),_transparent_32%)]"
      />
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-4 sm:px-6 sm:py-6 lg:flex-row lg:items-start lg:px-8">
        <AdminSidebar />
        <div className="min-w-0 flex-1 rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(14,15,28,0.78),rgba(8,9,16,0.9))] p-5 shadow-[0_24px_100px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-6 lg:p-8">
          {children}
        </div>
      </div>
    </main>
  );
}
