'use client';

import React from 'react';

interface ModalSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ModalSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}: ModalSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-end justify-center transition-opacity duration-200">
      <div className="bg-surface-container-lowest w-full max-w-[480px] rounded-t-3xl p-5 shadow-2xl relative animate-in slide-in-from-bottom max-h-[90vh] overflow-y-auto">
        <div className="w-12 h-1.5 bg-surface-container-highest rounded-full mx-auto mb-4"></div>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-on-surface leading-tight">{title}</h3>
            {subtitle && (
              <p className="text-xs text-on-surface-variant font-medium mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest cursor-pointer active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
