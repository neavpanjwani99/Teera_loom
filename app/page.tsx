'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useArtisan } from '../context/ArtisanContext';

export default function SplashPage() {
  const { speakText, isSpeaking } = useArtisan();
  const [showToast, setShowToast] = useState(false);

  const welcomeHi = "नमस्ते! टेरा लूम में आपका स्वागत है। आगे बढ़ने के लिए लाल बटन दबाएं।";
  const welcomeEn = "Namaste! Welcome to TeraLoom. Tap the start button to proceed.";

  const handleAudioTap = () => {
    setShowToast(true);
    speakText(welcomeHi, welcomeEn);
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-safe pb-safe">
      <div className="flex flex-col w-full px-4 pb-6 relative overflow-hidden select-none min-h-screen">
        {/* Subtle decorative ambient craft background motifs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 pointer-events-none opacity-30 text-outline-variant">
          <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" strokeDasharray="3 3"></circle>
            <circle cx="50" cy="50" r="34"></circle>
            <circle cx="50" cy="50" r="22" strokeDasharray="2 4"></circle>
            <path d="M50 6 L50 94 M6 50 L94 50 M19 19 L81 81 M19 81 L81 19" strokeLinecap="round"></path>
          </svg>
        </div>
        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-20 text-tertiary-fixed-dim">
          <svg className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 100 100">
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25"></polygon>
            <circle cx="50" cy="50" r="28" strokeDasharray="2 3"></circle>
            <line x1="50" x2="50" y1="5" y2="95"></line>
            <line x1="10" x2="90" y1="25" y2="75"></line>
            <line x1="10" x2="90" y1="75" y2="25"></line>
          </svg>
        </div>

        {/* Government & Ministry Top Bar */}
        <header className="relative z-10 pt-3 flex flex-col items-center">
          <div className="w-full bg-surface-container-lowest shadow-sm rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 border border-outline-variant/30">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider truncate">
                  वस्त्र मंत्रालय | भारत सरकार
                </span>
                <span className="text-[11px] font-medium text-on-surface-variant truncate">
                  Ministry of Textiles • Govt. of India
                </span>
              </div>
            </div>
            {/* Tiranga Micro Bar Indicator */}
            <div className="flex flex-col h-6 w-1.5 rounded-full overflow-hidden shrink-0">
              <span className="h-2 w-full bg-[#FF9933]"></span>
              <span className="h-2 w-full bg-[#FFFFFF]"></span>
              <span className="h-2 w-full bg-[#138808]"></span>
            </div>
          </div>
        </header>

        {/* Central Visual Section */}
        <section className="relative z-10 flex flex-col items-center mt-6 text-center flex-1 justify-center">
          {/* Ornate Mandala Ring */}
          <div className="relative flex items-center justify-center w-60 h-60 my-2">
            <div className="absolute inset-0 rounded-full bg-surface-container-low animate-pulse"></div>
            <svg className="absolute inset-2 w-56 h-56 text-primary opacity-30" fill="none" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeDasharray="4 6" strokeWidth="2.5"></circle>
              <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1.5"></circle>
              <circle cx="100" cy="100" r="70" stroke="currentColor" strokeDasharray="1 5" strokeWidth="2"></circle>
              <g stroke="currentColor" strokeWidth="1.5">
                <line x1="100" x2="100" y1="10" y2="20"></line>
                <line x1="100" x2="100" y1="180" y2="190"></line>
                <line x1="10" x2="20" y1="100" y2="100"></line>
                <line x1="180" x2="190" y1="100" y2="100"></line>
              </g>
            </svg>
            {/* Center Logo Insignia */}
            <div className="relative w-40 h-40 rounded-full bg-surface-container-lowest p-3 shadow-md flex items-center justify-center overflow-hidden border border-outline-variant/30">
              <img
                alt="TeraLoom Terracotta Shuttle Loom Insignia"
                className="w-full h-full object-contain select-none"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpU5TGiDJafDiVYspFP3O0a4j1A7eg72EBggqkUnxCjBTgGaBisSvRTrtU_BZ4-IFJ_SWc1lqFWO2pGVPBhEeQ8LaWFLg9SBhajGWx4Y7mDnF5drbggAqrhiiv0SUuE0bM76FlTEFxKi4O_tHG-EyQdykTAhx1-mqNIiNx09Tq09-s5gxn90Ty-F7WepCxSEbbncC4SoUt1v8MYmWN4SJMbt7EJvAslBmsRLscb3mk_2A8RV958pWo"
              />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-primary tracking-wide mt-2 mb-1">
            Tera Loom
          </h1>

          <div className="flex flex-col items-center gap-0.5 px-4">
            <p className="text-xl font-bold text-on-surface">
              आपका हुनर, दुनिया तक
            </p>
            <p className="text-base text-on-surface-variant font-medium">
              Your Craft, The World&apos;s Market
            </p>
          </div>

          <div className="mt-4 bg-surface-container-lowest shadow-sm rounded-full px-4 py-1.5 flex items-center gap-2 border border-outline-variant/20">
            <span className="material-symbols-outlined text-tertiary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-xs font-bold text-on-surface">
              Vocal for Local • PM Vishwakarma &amp; ODOP
            </span>
          </div>
        </section>

        {/* Artisan Spotlight Card */}
        <section className="relative z-10 w-full my-4">
          <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm flex items-center gap-3 border border-outline-variant/30">
            <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 relative bg-surface-container">
              <img
                className="w-full h-full object-cover"
                alt="Indian artisan weaving handloom"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf_dwPgjCDx1nmh8Nxa5chUCMmhh3ltjM7kuQ-HZ3GFY5T-Ll_opK8c8b3ZqSZ4cypNOBdbFwiY1bGVL5BRrBOZ4OxC75Xjf82CNrjCbrwGWbsRiS04JrOyAp3EqNaHLmewrABzCR_1XxYDd456Y-JXeOVDWGFZZ2dlg7CvCHNwmqnzYW7QwejN9kMYzVVqOmtXCDPAC4muh3_IxiRH5wRRcDDqWw8GzQI3Xs9Pgi08U4qohUiSt8G"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0 pr-1">
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">stars</span>
                7.2 लाख+ शिल्पकार जुड़े हैं
              </span>
              <p className="text-xs text-on-surface-variant truncate">
                Empowering Indian Handloom &amp; Handicrafts
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[20px]">diversity_3</span>
            </div>
          </div>
        </section>

        {/* Footer Actions */}
        <footer className="relative z-10 flex flex-col gap-3 mt-auto pt-2">
          <div className="flex items-center gap-2 w-full">
            <Link
              href="/onboarding/language"
              className="flex-1 h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
            >
              <span>शुरू करें • Get Started</span>
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </Link>

            <button
              onClick={handleAudioTap}
              className={`h-14 w-14 rounded-xl shadow-md flex flex-col items-center justify-center active:scale-95 transition-transform shrink-0 ${
                isSpeaking
                  ? 'bg-primary text-on-primary animate-audio-wave'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
              type="button"
              aria-label="Listen prompt"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isSpeaking ? 'pause' : 'volume_up'}
              </span>
              <span className="text-[10px] leading-tight font-bold">सुनें</span>
            </button>
          </div>

          {/* Audio Feedback Toast */}
          {showToast && (
            <div className="w-full bg-surface-container-high rounded-xl p-3 flex items-center gap-3 border border-outline-variant/30 animate-in fade-in">
              <span className="material-symbols-outlined text-primary text-[20px] animate-bounce">
                graphic_eq
              </span>
              <p className="text-xs text-on-surface flex-1">
                &ldquo;{welcomeHi}&rdquo;
              </p>
              <button
                onClick={() => setShowToast(false)}
                className="text-on-surface-variant p-1 hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          <div className="flex items-center justify-center gap-1.5 py-1">
            <span className="material-symbols-outlined text-outline text-[16px]">lock</span>
            <p className="text-[11px] text-on-surface-variant font-medium text-center">
              सुरक्षित सरकारी कल्याणकारी पोर्टल • Direct DBT Verified
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
