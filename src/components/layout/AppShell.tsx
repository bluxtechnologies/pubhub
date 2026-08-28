import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { RightSidebar } from './RightSidebar';
import { MobileNav } from './MobileNav';

export interface AppShellProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
  hideRightSidebar?: boolean;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  hideSidebar = false,
  hideRightSidebar = false,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header />
      <div className="flex flex-1 w-full max-w-7xl mx-auto justify-center">
        {!hideSidebar && <Sidebar />}
        <main className="flex-1 p-4 sm:p-6 pb-20 md:pb-8 min-w-0 max-w-3xl">
          {children}
        </main>
        {!hideRightSidebar && <RightSidebar />}
      </div>
      <MobileNav />
    </div>
  );
};
