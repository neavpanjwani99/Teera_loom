'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

const bgPresets = [
  { id: 'linen', nameHi: 'सूती कैनवास', nameEn: 'Linen Canvas', color: '#fcf9f4' },
  { id: 'studio', nameHi: 'स्टूडियो व्हाइट', nameEn: 'Studio White', color: '#ffffff' },
  { id: 'terracotta', nameHi: 'टेराकोटा टोन', nameEn: 'Terracotta Warm', color: '#f5eef7' },
  { id: 'wood', nameHi: 'काष्ठ धरातल', nameEn: 'Teak Wood', color: '#f0ede9' },
];

export default function BeforeAfterComparisonPage() {
  const { wizard, updateWizard, speakText } = useArtisan();
  const [sliderPos, setSliderPos] = useState(50); // 0 to 100
  const [activePreset, setActivePreset] = useState<string>(wizard.bgPreset || 'linen');

  const handleSelectPreset = (presetId: 'linen' | 'studio' | 'terracotta' | 'wood') => {
    setActivePreset(presetId);
    updateWizard({ bgPreset: presetId });
    speakText(`पृष्ठभूमि बदल दी गई है। आगे बढ़ने के लिए लाल बटन दबाएं।`);
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-20">
      <Header
        title="फोटो तुलना व स्टूडियो"
        subtitle="Before vs After Studio Background"
        showBack
        speechTextHi="स्लाइडर को खिसकाकर असली फोटो और एआई द्वारा साफ़ की गई फोटो की तुलना करें।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Info Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">compare</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">फोटो तुलना (Before / After)</h2>
              <p className="text-xs text-on-surface-variant font-medium">Drag slider to see AI background clean</p>
            </div>
          </div>
          <button
            onClick={() => speakText("स्लाइडर को बाएं दाएं खिसकाएं।")}
            className="px-3 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">volume_up</span>
            <span>सुनें</span>
          </button>
        </div>

        {/* Interactive Before/After Split Container */}
        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-2 border-outline-variant/40 bg-surface-container-low select-none">
          {/* AFTER (Enhanced Studio Photo) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${wizard.enhancedPhotoUrl || wizard.photoUrl}')` }}
          >
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-primary text-on-primary text-[11px] font-bold shadow-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>AI स्टूडियो फोटो</span>
            </div>
          </div>

          {/* BEFORE (Original Photo Clipped) */}
          <div
            className="absolute inset-0 bg-cover bg-center overflow-hidden border-r-2 border-white shadow-2xl"
            style={{
              backgroundImage: `url('${wizard.photoUrl}')`,
              width: `${sliderPos}%`,
              filter: 'sepia(0.2) contrast(0.95)',
            }}
          >
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-inverse-surface/80 text-inverse-on-surface backdrop-blur-sm text-[11px] font-bold shadow-md">
              <span>मूल फोटो (Original)</span>
            </div>
          </div>

          {/* Center Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize flex items-center justify-center shadow-2xl pointer-events-none"
            style={{ left: `calc(${sliderPos}% - 2px)` }}
          >
            <div className="w-8 h-8 rounded-full bg-primary text-on-primary shadow-xl flex items-center justify-center border-2 border-white text-xs font-bold">
              <span className="material-symbols-outlined text-[18px]">code</span>
            </div>
          </div>

          {/* Invisible Slider Input for Touch/Mouse Drag */}
          <input
            type="range"
            min={0}
            max={100}
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
          />
        </div>

        {/* Studio Background Presets */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2.5">
          <span className="text-xs font-bold text-on-surface">
            स्टूडियो बैकग्राउंड बदलें / Choose Studio Backdrop
          </span>

          <div className="grid grid-cols-4 gap-2">
            {bgPresets.map((preset) => {
              const isSelected = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset.id as any)}
                  className={`flex flex-col items-center p-2 rounded-xl border transition-all cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'border-2 border-primary bg-primary/5 shadow-sm font-bold'
                      : 'border-outline-variant/30 bg-surface-container-low text-on-surface-variant'
                  }`}
                >
                  <div
                    className="w-8 h-8 rounded-full border border-outline-variant shadow-inner mb-1 flex items-center justify-center"
                    style={{ backgroundColor: preset.color }}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-center font-bold text-on-surface leading-tight">
                    {preset.nameHi}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <Link
            href="/create/voice"
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
          >
            <span>आगे बढ़ें • Describe Craft (Voice)</span>
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
