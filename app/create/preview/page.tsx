'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function FinalListingPreviewPage() {
  const router = useRouter();
  const { wizard, addProductFromWizard, speakText } = useArtisan();
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    speakText("बधाई हो! आपका उत्पाद ONDC नेटवर्क और टेरा लूम पर लाइव हो गया है।");
    setTimeout(() => {
      addProductFromWizard();
      setIsPublishing(false);
      router.push('/inventory');
    }, 1200);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*${wizard.titleHi}*\nमूल्य: ₹${wizard.calculatedPrice}\nजीआई टैग प्रमाणित हस्तशिल्प। अधिक जानकारी और ऑर्डर के लिए संपर्क करें!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-24">
      <Header
        title="अंतिम पूर्वावलोकन"
        subtitle="Final ONDC Listing Preview"
        showBack
        speechTextHi="आपका उत्पाद तैयार है। प्रकाशित करें बटन दबाते ही यह ONDC नेटवर्क और डिजिटल मार्केट में लाइव हो जाएगा।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Verification Status Pill */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-forest-green/20 text-forest-green flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified_user
              </span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">ONDC नेटवर्क तैयार</h2>
              <p className="text-xs text-on-surface-variant font-medium">Ready for National Marketplace</p>
            </div>
          </div>
          <span className="text-xs font-bold text-forest-green bg-forest-green/10 px-2.5 py-1 rounded-full">
            100% Certified
          </span>
        </div>

        {/* E-Commerce Product Preview Card */}
        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-lg border border-outline-variant/40 flex flex-col">
          {/* Main Studio Image */}
          <div className="relative w-full aspect-[4/3] bg-surface-container-low">
            <img
              src={wizard.enhancedPhotoUrl || wizard.photoUrl}
              alt={wizard.titleEn}
              className="w-full h-full object-cover"
            />

            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest text-primary text-xs font-bold shadow-md flex items-center gap-1 border border-outline-variant/30">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span>GI Tag Certified</span>
            </div>

            <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/70 text-white backdrop-blur-md text-xs font-bold">
              स्टॉक: {wizard.stockQty || 5} पीस
            </div>
          </div>

          {/* Details Section */}
          <div className="p-4 flex flex-col gap-3">
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                बनारसी हथकरघा व शिल्प (Craft Item)
              </span>
              <h3 className="text-lg font-bold text-on-surface leading-tight mt-0.5">
                {wizard.titleHi}
              </h3>
              <p className="text-xs text-on-surface-variant font-medium">{wizard.titleEn}</p>
            </div>

            {/* Price Row */}
            <div className="flex items-baseline justify-between py-2 border-y border-outline-variant/20">
              <div>
                <span className="text-xs text-on-surface-variant block font-medium">बिक्री मूल्य (Fair Price):</span>
                <span className="text-2xl font-bold text-primary">
                  ₹{wizard.calculatedPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs text-forest-green font-bold block">निःशुल्क शिपिंग (Free Delivery)</span>
                <span className="text-[11px] text-on-surface-variant">शामिल सरकारी सहायता</span>
              </div>
            </div>

            {/* Story Box */}
            <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-1 border border-outline-variant/20">
              <span className="text-xs font-bold text-on-surface flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">auto_awesome</span>
                सांस्कृतिक कहानी व विवरण:
              </span>
              <p className="text-xs text-on-surface-variant font-medium leading-relaxed">
                {wizard.storyHi}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {wizard.materialTags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp Share Action */}
        <button
          onClick={handleShareWhatsApp}
          className="w-full h-12 bg-forest-green/10 text-forest-green border border-forest-green/30 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-forest-green/20"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px]">share</span>
          <span>व्हाट्सएप बिजनेस पर शेयर करें (Share on WhatsApp)</span>
        </button>

        {/* One-Tap Publish CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container cursor-pointer"
          >
            {isPublishing ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>प्रकाशित किया जा रहा है...</span>
              </>
            ) : (
              <>
                <span>उत्पाद प्रकाशित करें • Publish Listing</span>
                <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
