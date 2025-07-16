'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: Icons.dashboard,
  },
  {
    href: '/transactions',
    label: 'Transactions',
    icon: Icons.transactions,
  },
  {
    href: '/reports',
    label: 'Reports',
    icon: Icons.reports,
  },
  {
    href: '/budget-ai',
    label: 'Budget AI',
    icon: Icons.budgetAI,
  },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex h-10 items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 rounded-full"
              asChild
            >
              <Link href="/">
                <Icons.wallet className="size-5" />
                <span className="sr-only">FinSight</span>
              </Link>
            </Button>
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold">FinSight</h2>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="max-md:hidden">
          <div className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-sidebar-foreground">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 truncate">
              <p className="font-semibold">User</p>
            </div>
            <Button variant="ghost" size="icon">
              <Icons.logout className="h-4 w-4" />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
