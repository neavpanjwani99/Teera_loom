'use client';

import React from 'react';
import { useArtisan } from '@/context/ArtisanContext';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  speechTextHi?: string;
  speechTextEn?: string;
}

export default function Header({
  title = 'TeraLoom',
  subtitle = 'Artisan Platform',
  showBack = false,
  onBack,
  speechTextHi,
  speechTextEn,
}: HeaderProps) {
  const { speakText, isSpeaking } = useArtisan();

  return (
    <header className="fixed top-0 w-full max-w-[480px] z-50 pt-safe bg-surface/90 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm">
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={onBack || (() => window.history.back())}
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface hover:bg-surface-container-highest active:scale-95 transition-all"
              aria-label="Back"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm shadow-sm">
              कला
            </div>
          )}
          <div>
            <h1 className="text-base font-bold text-on-surface leading-tight">{title}</h1>
            <p className="text-xs text-on-surface-variant font-medium">{subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {speechTextHi && (
            <button
              onClick={() => speakText(speechTextHi, speechTextEn)}
              className={`min-w-[44px] min-h-[44px] w-11 h-11 rounded-full flex items-center justify-center shadow-sm active:scale-95 transition-transform ${
                isSpeaking
                  ? 'bg-primary text-on-primary animate-audio-wave'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed hover:opacity-90'
              }`}
              title="Voice Assist / सुनें"
              type="button"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isSpeaking ? 'pause' : 'volume_up'}
              </span>
            </button>
          )}

          <button
            onClick={() => alert('कोई नई सूचना नहीं है (No new notifications)')}
            className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-colors"
            title="Notifications"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
          </button>
        </div>
      </div>
    </header>
  );
}
