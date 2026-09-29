'use client';

import React from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

const languagesList = [
  { id: 'hi', native: 'हिंदी', english: 'Hindi', script: 'नमस्ते', isPopular: true },
  { id: 'en', native: 'English', english: 'English', script: 'Welcome', isPopular: true },
  { id: 'bn', native: 'বাংলা', english: 'Bengali', script: 'নমস্কার', isPopular: false },
  { id: 'ta', native: 'தமிழ்', english: 'Tamil', script: 'வணக்கம்', isPopular: false },
  { id: 'te', native: 'తెలుగు', english: 'Telugu', script: 'నమస్కారం', isPopular: false },
  { id: 'mr', native: 'मराठी', english: 'Marathi', script: 'नमस्कार', isPopular: false },
  { id: 'gu', native: 'ગુજરાતી', english: 'Gujarati', script: 'નમસ્તે', isPopular: false },
  { id: 'kn', native: 'ಕನ್ನಡ', english: 'Kannada', script: 'ನಮಸ್ಕಾರ', isPopular: false },
  { id: 'or', native: 'ଓଡ଼ିଆ', english: 'Odia', script: 'ନମସ୍କାର', isPopular: false },
  { id: 'ml', native: 'മലയാളം', english: 'Malayalam', script: 'നമസ്കാരം', isPopular: false },
  { id: 'pa', native: 'ਪੰਜਾਬੀ', english: 'Punjabi', script: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ', isPopular: false },
  { id: 'as', native: 'অসমীয়া', english: 'Assamese', script: 'নমস্কাৰ', isPopular: false },
];

export default function LanguageSelectionPage() {
  const { language, setLanguage, speakText } = useArtisan();

  const handleSelectLanguage = (langId: string, nativeName: string) => {
    setLanguage(langId);
    speakText(`आपने ${nativeName} भाषा चुनी है। आगे बढ़ने के लिए नीचे बटन दबाएं।`);
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-20">
      <Header
        title="भाषा का चयन"
        subtitle="Language Selection"
        showBack
        speechTextHi="कृपया अपनी पसंदीदा भाषा चुनें। ऐप उसी भाषा में काम करेगा।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Voice Assistance Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">अपनी भाषा चुनें</h2>
              <p className="text-xs text-on-surface-variant font-medium">Select preferred language</p>
            </div>
          </div>
          <button
            onClick={() => speakText("बोलकर भाषा सुनने के लिए किसी भी कार्ड पर टैप करें।")}
            className="px-3 py-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[16px]">volume_up</span>
            <span>सुनें</span>
          </button>
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-2 gap-3">
          {languagesList.map((lang) => {
            const isSelected = language === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => handleSelectLanguage(lang.id, lang.native)}
                className={`flex flex-col items-start p-3.5 rounded-2xl border transition-all text-left relative cursor-pointer active:scale-95 ${
                  isSelected
                    ? 'bg-surface-container-lowest border-2 border-primary shadow-md ring-2 ring-primary/20'
                    : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/50 shadow-sm'
                }`}
              >
                {lang.isPopular && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[9px] font-bold">
                    लोकप्रिय
                  </span>
                )}

                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg font-bold text-primary">{lang.script}</span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  )}
                </div>

                <span className="text-base font-bold text-on-surface">{lang.native}</span>
                <span className="text-xs font-medium text-on-surface-variant">{lang.english}</span>
              </button>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <Link
            href="/onboarding/craft-type"
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
          >
            <span>आगे बढ़ें • Continue</span>
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
