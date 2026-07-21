import React from "react";
import Sidebar from "@/app/components/Sidebar";

export const metadata = {
  title: "Dashboard | Saarthi AI",
  description: "Unified AI Assistant Dashboard with active feeds, integrations, and automation controls.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#030308] text-slate-900 dark:text-slate-100 font-sans grid-bg transition-colors duration-300">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main View Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Background Radial Glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-8 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-white/10">
          {children}
        </div>
      </main>
    </div>
  );
}
