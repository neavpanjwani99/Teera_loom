'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on splash & onboarding screens
  if (
    pathname === '/' ||
    pathname.startsWith('/onboarding') ||
    pathname.startsWith('/create')
  ) {
    return null;
  }

  const navItems = [
    { label: 'Home', href: '/dashboard', icon: 'cottage' },
    { label: 'Products', href: '/inventory', icon: 'inventory_2' },
    { label: 'Add', href: '/create/camera', icon: 'photo_camera', isFab: true },
    { label: 'Orders', href: '/orders', icon: 'receipt_long' },
    { label: 'Profile', href: '/profile', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-[480px] z-50 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-4px_16px_-4px_rgba(70,35,15,0.12)]">
      <div className="h-16 px-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="-mt-5 mx-1 flex flex-col items-center justify-center min-w-[56px] min-h-[56px] w-14 h-14 rounded-full bg-primary text-on-primary shadow-[0_4px_16px_-4px_rgba(159,60,22,0.4)] active:scale-95 transition-transform cursor-pointer"
                title="Add New Craft"
              >
                <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-1 min-h-[48px] transition-all cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-primary font-bold'
                  : 'text-on-surface-variant hover:text-primary font-medium'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              <span className="text-[12px] leading-none mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
