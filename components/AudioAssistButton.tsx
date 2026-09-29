'use client';

import React from 'react';
import { useArtisan } from '@/context/ArtisanContext';

interface AudioAssistButtonProps {
  textHi: string;
  textEn?: string;
  variant?: 'pill' | 'circle' | 'banner';
  labelHi?: string;
  labelEn?: string;
}

export default function AudioAssistButton({
  textHi,
  textEn,
  variant = 'pill',
  labelHi = 'सुनें',
}: AudioAssistButtonProps) {
  const { speakText, isSpeaking } = useArtisan();

  if (variant === 'circle') {
    return (
      <button
        onClick={() => speakText(textHi, textEn)}
        className={`w-12 h-12 rounded-full flex flex-col items-center justify-center shadow-md active:scale-95 transition-transform ${
          isSpeaking
            ? 'bg-primary text-on-primary animate-audio-wave'
            : 'bg-tertiary-fixed text-on-tertiary-fixed'
        }`}
        type="button"
        title="Listen audio prompt"
      >
        <span className="material-symbols-outlined text-[24px]">
          {isSpeaking ? 'pause' : 'volume_up'}
        </span>
        <span className="text-[10px] leading-tight font-bold">{labelHi}</span>
      </button>
    );
  }

  if (variant === 'banner') {
    return (
      <div className="w-full bg-surface-container-high rounded-xl p-3 flex items-center justify-between gap-3 shadow-sm border border-outline-variant/30">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <span className="material-symbols-outlined text-primary text-[22px] animate-pulse">
            graphic_eq
          </span>
          <p className="text-xs text-on-surface font-medium truncate">{textHi}</p>
        </div>
        <button
          onClick={() => speakText(textHi, textEn)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm transition-all ${
            isSpeaking
              ? 'bg-primary text-on-primary'
              : 'bg-tertiary-fixed text-on-tertiary-fixed hover:opacity-90'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isSpeaking ? 'stop' : 'volume_up'}
          </span>
          <span>{isSpeaking ? 'रोकें' : labelHi}</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => speakText(textHi, textEn)}
      className={`h-14 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform ${
        isSpeaking
          ? 'bg-primary text-on-primary animate-audio-wave'
          : 'bg-tertiary-fixed text-on-tertiary-fixed'
      }`}
      type="button"
    >
      <span className="material-symbols-outlined text-[26px]">
        {isSpeaking ? 'pause' : 'volume_up'}
      </span>
      <div className="flex flex-col text-left leading-tight">
        <span className="text-xs font-bold">{labelHi}</span>
        <span className="text-[10px] opacity-80 font-medium">Audio Assist</span>
      </div>
    </button>
  );
}
