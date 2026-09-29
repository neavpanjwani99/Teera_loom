'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function AIDescriptionPreviewPage() {
  const { wizard, updateWizard, speakText } = useArtisan();
  const [activeLangTab, setActiveLangTab] = useState<'hi' | 'en'>('hi');
  const [titleHi, setTitleHi] = useState(wizard.titleHi || 'हाथ से बना गंगा माटी टेराकोटा कलश');
  const [titleEn, setTitleEn] = useState(wizard.titleEn || 'Handcrafted Heritage Terracotta Kalash');
  const [storyHi, setStoryHi] = useState(wizard.storyHi || 'वाराणसी की पवित्र गंगा नदी के तट से ली गई मिट्टी से निर्मित। प्राचीन मिट्टी कला शैली में 12 घंटे भट्टियों में पकाकर तैयार किया गया टिकाऊ हस्तशिल्प।');
  const [storyEn, setStoryEn] = useState(wizard.storyEn || 'Hand-fashioned from sacred Varanasi clay, fired for 12 hours in traditional kiln furnaces following century-old artisan techniques.');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = () => {
    setIsRegenerating(true);
    speakText("एआई नई सांस्कृतिक कहानी और विवरण तैयार कर रहा है।");
    setTimeout(() => {
      setIsRegenerating(false);
      setStoryHi('काशी के पारंपरिक कुम्हार घराने की सिद्ध हस्तकला। गंगा की माटी पर उकेरी गई महीन बारीक नक्काशी, जो आपके गृह प्रवेश व पूजा स्थल को पावन आध्यात्मिक सौंदर्य प्रदान करती है।');
      setStoryEn('Masterfully sculpted by ancestral Varanasi potters. Intricately carved with sacred motifs to bring authentic heritage and spiritual elegance to your home.');
    }, 1200);
  };

  const handleTitleChange = (val: string) => {
    if (activeLangTab === 'hi') {
      setTitleHi(val);
      updateWizard({ titleHi: val });
    } else {
      setTitleEn(val);
      updateWizard({ titleEn: val });
    }
  };

  const handleStoryChange = (val: string) => {
    if (activeLangTab === 'hi') {
      setStoryHi(val);
      updateWizard({ storyHi: val });
    } else {
      setStoryEn(val);
      updateWizard({ storyEn: val });
    }
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-20">
      <Header
        title="AI सांस्कृतिक विवरण"
        subtitle="Generated Story & Craft Details"
        showBack
        speechTextHi={activeLangTab === 'hi' ? storyHi : storyEn}
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Info Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">एआई द्वारा निर्मित कहानी</h2>
              <p className="text-xs text-on-surface-variant font-medium">Bilingual Storytelling &amp; Product Metadata</p>
            </div>
          </div>

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="px-3 py-1.5 rounded-lg bg-secondary text-on-secondary text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
          >
            <span className={`material-symbols-outlined text-[16px] ${isRegenerating ? 'animate-spin' : ''}`}>
              refresh
            </span>
            <span>{isRegenerating ? 'तैयार...' : 'पुनः बनाएं'}</span>
          </button>
        </div>

        {/* Bilingual Language Switcher */}
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
          <button
            onClick={() => setActiveLangTab('hi')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeLangTab === 'hi'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            हिंदी (Hindi Description)
          </button>
          <button
            onClick={() => setActiveLangTab('en')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
              activeLangTab === 'en'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            English (Global Story)
          </button>
        </div>

        {/* Title Input */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <label className="text-xs font-bold text-on-surface">
            उत्पाद का शीर्षक / Product Title ({activeLangTab.toUpperCase()})
          </label>
          <input
            type="text"
            value={activeLangTab === 'hi' ? titleHi : titleEn}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full h-12 px-3.5 rounded-xl border border-outline-variant/40 focus:border-primary text-sm font-bold text-on-surface bg-surface-container-low outline-none"
          />
        </div>

        {/* Story Textarea */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-on-surface">
              सांस्कृतिक कहानी व विवरण / Heritage Story
            </label>
            <button
              onClick={() => speakText(activeLangTab === 'hi' ? storyHi : storyEn)}
              className="px-2.5 py-1 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[14px]">volume_up</span>
              <span>सुनें</span>
            </button>
          </div>

          <textarea
            rows={4}
            value={activeLangTab === 'hi' ? storyHi : storyEn}
            onChange={(e) => handleStoryChange(e.target.value)}
            className="w-full p-3.5 rounded-xl border border-outline-variant/40 focus:border-primary text-xs font-medium text-on-surface bg-surface-container-low outline-none resize-none leading-relaxed"
          />
        </div>

        {/* Material & Craft Tags */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <span className="text-xs font-bold text-on-surface">
            सामग्री व विधा टैग / Material &amp; Craft Tags
          </span>
          <div className="flex flex-wrap gap-2 pt-1">
            {wizard.materialTags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <span className="material-symbols-outlined text-[14px]">label</span>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <Link
            href="/create/pricing"
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
          >
            <span>मूल्य निर्धारण • Dynamic Pricing</span>
            <span className="material-symbols-outlined text-[24px]">payments</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
