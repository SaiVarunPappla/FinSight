import * as React from 'react';
import { SidebarTrigger } from '../ui/sidebar';

interface PageHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <header className="no-print mb-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-2">{children}</div>
    </header>
  );
}
