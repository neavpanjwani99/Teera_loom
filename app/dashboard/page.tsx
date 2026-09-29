'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import ModalSheet from '../../components/ModalSheet';
import { useArtisan } from '../../context/ArtisanContext';

export default function DashboardPage() {
  const {
    artisanNameHi,
    artisanNameEn,
    artisanLocation,
    craftTypeHi,
    vishwakarmaId,
    totalEarnings,
    orders,
    products,
    speakText,
    isSpeaking,
  } = useArtisan();

  const [isBoothModalOpen, setIsBoothModalOpen] = useState(false);
  const [showAudioToast, setShowAudioToast] = useState(false);

  const dailySummaryHi =
    "नमस्ते रमेश जी। आज आपकी दुकान पर 7 नए ऑर्डर आए हैं। 2 पार्सल डिस्पेच के लिए तैयार करने हैं। आपकी कुल कमाई 42,850 रुपये हो चुकी है। सूरजकुंड मेला 12 दिन में शुरू हो रहा है, आपका स्टॉल सी-42 कन्फर्म है।";
  const dailySummaryEn =
    "Namaste Ramesh ji. You have 7 new orders today. Total earnings are ₹42,850. Surajkund Crafts Mela begins in 12 days, booth C-42 confirmed.";

  const handleDailyAudio = () => {
    setShowAudioToast(!showAudioToast);
    speakText(dailySummaryHi, dailySummaryEn);
  };

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const liveProductsCount = products.filter((p) => p.status === 'active').length;

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-24">
      <Header
        title="Tera Loom"
        subtitle="Home Dashboard"
        speechTextHi={dailySummaryHi}
        speechTextEn={dailySummaryEn}
      />

      <div className="flex flex-col w-full pb-8">
        {/* Top Artisan Identity Bar & Voice Hub */}
        <section className="px-4 pt-3 pb-2">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm relative overflow-hidden border border-outline-variant/30">
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>
            <div className="flex items-start justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-surface-container-high shadow-sm border-2 border-primary/20">
                    <img
                      className="w-full h-full object-cover"
                      alt={artisanNameEn}
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5akzbpH0ObNjaF9bvEpCI6EUvA_ObDSHh5W2RmBURwPTlydaxK_WY3La914OmwenqDEpmk2wG-twblHuxaGe6eM5Ca72gLyoIP40aynyAVaVkeWSGX4-MdveIW6KLov6mxnIc--i0_YkPEgrHcJtfR7iV4lyVsqf6Uq1_CMqyIvlHoymNG8kuUYu3aGUXTgqyXKKdnOxjY8JTsVXrupYtyHQH82FQEuMPbYWrJRT-j1E5kv6IzXJA"
                    />
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow"
                    title="Govt Verified Artisan"
                  >
                    <span
                      className="material-symbols-outlined text-[16px] text-on-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified
                    </span>
                  </div>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-base font-bold text-on-surface leading-tight">
                      नमस्ते {artisanNameHi}
                    </h2>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                      GI Tagged
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-medium">
                    Namaste {artisanNameEn}
                  </p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="inline-flex items-center gap-1 text-[11px] text-primary font-bold">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {artisanLocation}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
                    <span className="text-[11px] text-on-surface-variant font-bold truncate">
                      {craftTypeHi}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleDailyAudio}
                className={`flex-none flex flex-col items-center justify-center w-12 h-12 rounded-full shadow-sm active:scale-95 transition-transform cursor-pointer ${
                  isSpeaking
                    ? 'bg-primary text-on-primary animate-audio-wave'
                    : 'bg-tertiary-fixed text-on-tertiary-fixed'
                }`}
                type="button"
                aria-label="Audio summary"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isSpeaking ? 'pause' : 'volume_up'}
                </span>
                <span className="text-[10px] leading-none mt-0.5 font-bold">सुनें</span>
              </button>
            </div>

            {showAudioToast && (
              <div className="mt-3 p-3 rounded-xl bg-tertiary-fixed/40 text-on-tertiary-fixed flex items-center justify-between border border-tertiary-fixed/60">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-tertiary text-[20px] animate-pulse">
                    graphic_eq
                  </span>
                  <p className="text-xs truncate font-medium">{dailySummaryHi}</p>
                </div>
                <button
                  className="text-xs text-tertiary font-bold ml-2 shrink-0 underline"
                  onClick={() => setShowAudioToast(false)}
                >
                  बंद करें
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quick Action: Add Craft Banner */}
        <section className="px-4 py-2">
          <Link
            href="/create/camera"
            className="block bg-gradient-to-r from-primary to-primary-container rounded-2xl p-4 text-on-primary shadow-md active:scale-[0.99] transition-transform relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none flex items-center justify-center">
              <span className="material-symbols-outlined text-[100px] text-on-primary">
                photo_camera
              </span>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[28px]">add_a_photo</span>
                </div>
                <div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-on-primary text-[10px] font-bold mb-1">
                    <span className="material-symbols-outlined text-[12px]">bolt</span>
                    <span>2 मिनट में लाइव / In 2 Mins</span>
                  </div>
                  <h3 className="text-base font-bold text-on-primary leading-tight">
                    नया शिल्प जोड़ें
                  </h3>
                  <p className="text-xs text-on-primary/90 font-medium">Add New Craft Product Now</p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-surface-container-lowest/20 flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </div>
            </div>
          </Link>
        </section>

        {/* Key Artisan Metrics */}
        <section className="px-4 py-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-on-surface">दुकान की स्थिति / Store Stats</h3>
            <span className="text-xs text-secondary font-bold">अपडेटेड: अभी-अभी</span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {/* Total Earnings */}
            <Link
              href="/profile"
              className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex items-center justify-between border border-outline-variant/30 active:scale-[0.99] transition-transform hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0">
                  <span className="material-symbols-outlined text-[28px]">account_balance_wallet</span>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                    Total Earnings / कुल कमाई
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-2xl font-bold text-on-surface">
                      ₹{totalEarnings.toLocaleString('en-IN')}
                    </span>
                    <span className="inline-flex items-center text-xs text-forest-green font-bold">
                      <span className="material-symbols-outlined text-[16px]">trending_up</span> +18%
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-2 h-2 rounded-full bg-forest-green"></span>
                    <p className="text-[11px] text-on-surface-variant font-medium">
                      DBT बैंक खाते में भेजा गया / Auto-credited
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                  इस माह
                </span>
              </div>
            </Link>

            {/* Orders & Products Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                href="/orders"
                className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm flex flex-col justify-between border border-outline-variant/30 active:scale-[0.98] transition-transform hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">local_shipping</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-bold">
                    2 डिस्पेच बाकी
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-on-surface-variant font-bold block">
                    Orders / ऑर्डर
                  </span>
                  <p className="text-lg font-bold text-on-surface leading-tight">
                    {newOrdersCount} नए <span className="text-xs font-normal text-on-surface-variant">/ New</span>
                  </p>
                  <p className="text-[11px] text-primary font-bold mt-1">पैकिंग शुरू करें →</p>
                </div>
              </Link>

              <Link
                href="/inventory"
                className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm flex flex-col justify-between border border-outline-variant/30 active:scale-[0.98] transition-transform hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">inventory</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-bold">
                    3 ड्राफ्ट
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-xs text-on-surface-variant font-bold block">
                    Products / उत्पाद
                  </span>
                  <p className="text-lg font-bold text-on-surface leading-tight">
                    {liveProductsCount} लाइव <span className="text-xs font-normal text-on-surface-variant">/ Live</span>
                  </p>
                  <p className="text-[11px] text-secondary font-bold mt-1">सूची देखें →</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Market Trend Widget: Aaj Ka Bazaar Bhav */}
        <section className="px-4 py-2">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                  <span className="material-symbols-outlined text-[20px]">insights</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface leading-tight">आज का बाज़ार भाव</h3>
                  <p className="text-[11px] text-on-surface-variant font-medium">Today&apos;s Craft Demand Trends</p>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14% मांग
              </span>
            </div>

            <div className="mt-2 p-3 rounded-xl bg-surface-container-low flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  <span className="text-xs text-on-surface font-bold">Silk Scarves &amp; Brass Diya</span>
                </div>
                <span className="text-xs text-primary font-bold">तेज़ मांग / High Demand</span>
              </div>

              {/* Sparkline SVG */}
              <div className="w-full h-10 flex items-center">
                <svg className="w-full h-8" fill="none" viewBox="0 0 300 48" preserveAspectRatio="none">
                  <path
                    d="M0,40 Q35,38 70,25 T140,28 T210,12 T280,6 L300,4"
                    fill="none"
                    stroke="#9f3c16"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle cx="280" cy="6" r="4" fill="#9f3c16" />
                </svg>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-outline-variant/20">
                <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-[14px] text-tertiary">alarm</span>
                  <span>सर्वोत्तम बिक्री समय: शाम 5 से रात 9 बजे</span>
                </div>
                <span className="text-[11px] text-secondary font-bold">Peak Time</span>
              </div>
            </div>
          </div>
        </section>

        {/* Surajkund Crafts Mela Event Widget */}
        <section className="px-4 py-2">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">festival</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-on-surface leading-tight">मेला कैलेंडर / Craft Fairs</h3>
                  <p className="text-[11px] text-on-surface-variant font-medium">National Artisan Exhibitions</p>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-bold">
                Govt Sponsored
              </span>
            </div>

            <div className="rounded-xl overflow-hidden bg-surface-container-low shadow-sm border border-outline-variant/20">
              <div className="relative h-28 w-full">
                <img
                  className="w-full h-full object-cover"
                  alt="Surajkund International Crafts Mela"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhGn-CRF3DM7do3FoN7_AyvMNeG2IeYYhSIY1FvFgBrvyQV08OppbcX8RN6XaBn8YfecW0TJsBiTwAPVR9GyyKoa-Zkg8G1PQ7dOSjQVltM72FnvanPAX_BMa7kyflwg6iVSh4T22LHpWbLyjHbjzDKrGhVKSgp08AIa7k8O6PB9quqlyC4_ac1P-5HSMjlWysXBMZTWuN9o4BYmSzftNekXvZXXhxQzf1OBZrtFKdrr6acurv5mXg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent"></div>
                <div className="absolute top-2 left-2">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-lowest text-primary font-bold shadow-sm inline-flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    12 दिनों में शुरू / Starts in 12 days
                  </span>
                </div>
                <div className="absolute bottom-2 left-3 right-3 text-inverse-on-surface">
                  <p className="text-sm font-bold leading-tight">सूरजकुंड अंतर्राष्ट्रीय शिल्प मेला</p>
                  <p className="text-[10px] opacity-90 font-medium">Surajkund Crafts Mela, Faridabad</p>
                </div>
              </div>

              <div className="p-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-secondary font-bold block">पंजीकरण स्वीकृत (Confirmed)</span>
                    <span className="text-[10px] text-on-surface-variant font-medium">स्टॉल: C-42 (हथकरघा पवेलियन)</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsBoothModalOpen(true)}
                  className="h-9 px-3 rounded-lg bg-primary text-on-primary text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                  <span>पास देखें / Pass</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PM Vishwakarma Banner */}
        <section className="px-4 py-2">
          <div
            onClick={() => alert('पीएम विश्वकर्मा योजना: ₹15,000 टूलकिट सहायता स्वीकृत। (PM Vishwakarma Grant Approved)')}
            className="bg-surface-container-high rounded-2xl p-4 flex items-center justify-between shadow-sm cursor-pointer hover:bg-surface-container-highest transition-colors active:scale-[0.99] border border-outline-variant/30"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[24px]">workspace_premium</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface">पीएम विश्वकर्मा टूलकिट सहायता</h4>
                <p className="text-[11px] text-on-surface-variant font-medium">₹15,000 अनुदान स्वीकृत • खाता सत्यापन पूर्ण</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">arrow_forward</span>
          </div>
        </section>
      </div>

      {/* Booth Allotment Modal Sheet */}
      <ModalSheet
        isOpen={isBoothModalOpen}
        onClose={() => setIsBoothModalOpen(false)}
        title="सूरजकुंड क्राफ्ट्स मेला - Booth C-42"
        subtitle="आधिकारिक आवंटन पास (Official Govt Allotment Letter)"
      >
        <div className="bg-surface-container-low rounded-xl p-4 mb-4 flex flex-col gap-2.5 border border-outline-variant/30">
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Artisan ID / शिल्पकार पहचान:</span>
            <span className="text-on-surface font-bold">{vishwakarmaId}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Artisan Name:</span>
            <span className="text-on-surface font-bold">{artisanNameHi} ({artisanNameEn})</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Booth Setup Dates:</span>
            <span className="text-on-surface font-bold">1st Feb - 18th Feb 2026</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-on-surface-variant font-medium">Electricity &amp; Wi-Fi:</span>
            <span className="text-forest-green font-bold">Free Govt Allotted</span>
          </div>
        </div>

        <div className="flex gap-2.5">
          <button
            onClick={() => setIsBoothModalOpen(false)}
            className="flex-1 h-12 rounded-xl bg-surface-container-high text-on-surface text-xs font-bold active:scale-95 transition-transform"
            type="button"
          >
            वापस जाएं (Close)
          </button>
          <button
            onClick={() => {
              alert('आवंटन पास डाउनलोड हो गया है (Booth Pass Downloaded).');
              setIsBoothModalOpen(false);
            }}
            className="flex-1 h-12 rounded-xl bg-primary text-on-primary text-xs font-bold flex items-center justify-center gap-1 shadow-sm active:scale-95 transition-transform"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>पास डाउनलोड करें</span>
          </button>
        </div>
      </ModalSheet>

      <BottomNav />
    </main>
  );
}
