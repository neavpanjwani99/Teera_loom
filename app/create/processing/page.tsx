'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function AIProcessingPage() {
  const router = useRouter();
  const { speakText } = useArtisan();
  const [step, setStep] = useState(1);

  useEffect(() => {
    speakText("एआई स्टूडियो फोटो को साफ़ और सुंदर बना रहा है। कृपया प्रतीक्षा करें।");

    const timer1 = setTimeout(() => setStep(2), 900);
    const timer2 = setTimeout(() => setStep(3), 1800);
    const timer3 = setTimeout(() => {
      router.push('/create/comparison');
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router, speakText]);

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-12 justify-between">
      <Header
        title="AI स्टूडियो प्रोसेसिंग"
        subtitle="Studio Quality Enhancement"
        showBack
      />

      <div className="flex flex-col items-center justify-center flex-1 px-4 text-center my-auto">
        {/* Animated Glow Halo */}
        <div className="relative flex items-center justify-center w-52 h-52 my-6">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping"></div>
          <div className="absolute inset-4 rounded-full bg-primary/20 animate-pulse"></div>

          {/* Rotating Spinner Ring */}
          <svg className="w-48 h-48 animate-spin text-primary" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="60 120"
              strokeLinecap="round"
            />
          </svg>

          {/* Center AI Stamp */}
          <div className="absolute inset-10 rounded-full bg-surface-container-lowest shadow-xl flex flex-col items-center justify-center p-3 border border-outline-variant/30">
            <span className="material-symbols-outlined text-primary text-[42px] animate-bounce" style={{ fontVariationSettings: "'FILL' 1" }}>
              auto_awesome
            </span>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider mt-1">
              AI Studio
            </span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-on-surface mb-1">
          फोटो एनहांसमेंट चालू है...
        </h2>
        <p className="text-xs text-on-surface-variant font-medium mb-6">
          Removing background &amp; lighting adjustments
        </p>

        {/* 3 Step Progress Checklist */}
        <div className="w-full max-w-xs bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col gap-3 text-left">
          {/* Step 1 */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 1 ? 'bg-forest-green text-white' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {step >= 1 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : (
                '1'
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-on-surface">चित्र विश्लेषण (Image Analysis)</span>
              <span className="text-[10px] text-on-surface-variant">प्रकाश व कोण जांच पूर्ण</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 2 ? 'bg-forest-green text-white' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {step >= 2 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : step === 1 ? (
                <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
              ) : (
                '2'
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-on-surface">पृष्ठभूमि हटाना (Studio Clean)</span>
              <span className="text-[10px] text-on-surface-variant">बैकग्राउंड रिमूवल व स्टूडियो रिफ्लेक्शन</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-center gap-3">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              step >= 3 ? 'bg-forest-green text-white' : 'bg-surface-container-high text-on-surface-variant'
            }`}>
              {step >= 3 ? (
                <span className="material-symbols-outlined text-[18px]">check</span>
              ) : step === 2 ? (
                <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
              ) : (
                '3'
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-on-surface">क्राफ्ट विधा वर्गीकरण (Craft Classification)</span>
              <span className="text-[10px] text-on-surface-variant">जीआई टैग व बनावट पहचान</span>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Skip Button */}
      <div className="p-4 w-full max-w-[480px] mx-auto">
        <button
          onClick={() => router.push('/create/comparison')}
          className="w-full h-12 bg-surface-container-high text-on-surface rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1 active:scale-95 transition-transform"
        >
          <span>आगे बढ़ें (Skip Waiting)</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </main>
  );
}
