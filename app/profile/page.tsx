'use client';

import React from 'react';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useArtisan } from '../../context/ArtisanContext';

export default function ProfileEarningsPage() {
  const {
    artisanNameHi,
    artisanNameEn,
    artisanLocation,
    craftTypeHi,
    vishwakarmaId,
    totalEarnings,
    speakText,
  } = useArtisan();

  const handleDownloadCert = (type: string) => {
    speakText(`${type} डाउनलोड हो गया है।`);
    alert(`${type} डाउनलोड हो गया है (Certificate Downloaded).`);
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-24">
      <Header
        title="प्रोफ़ाइल व बैंक खाता"
        subtitle="Artisan Card &amp; DBT Earnings"
        speechTextHi="यहाँ आपकी सरकारी शिल्पकार आईडी, बैंक खाता और डीबीटी भुगतान की स्थिति है।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Official PM Vishwakarma Artisan Identity Card */}
        <div className="bg-gradient-to-br from-inverse-surface via-[#252422] to-inverse-surface rounded-3xl p-5 text-inverse-on-surface shadow-xl relative overflow-hidden border border-outline-variant/30">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Card Top Seal */}
          <div className="flex items-center justify-between border-b border-white/15 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-surface-container-lowest/20 flex items-center justify-center text-primary-fixed">
                <span className="material-symbols-outlined text-[18px]">account_balance</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white/90">
                भारत सरकार • PM Vishwakarma Verified
              </span>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-forest-green/20 text-forest-green font-bold border border-forest-green/30">
              Active ID
            </span>
          </div>

          {/* Artisan Profile Details */}
          <div className="flex items-center gap-3.5 my-1">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-md shrink-0">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5akzbpH0ObNjaF9bvEpCI6EUvA_ObDSHh5W2RmBURwPTlydaxK_WY3La914OmwenqDEpmk2wG-twblHuxaGe6eM5Ca72gLyoIP40aynyAVaVkeWSGX4-MdveIW6KLov6mxnIc--i0_YkPEgrHcJtfR7iV4lyVsqf6Uq1_CMqyIvlHoymNG8kuUYu3aGUXTgqyXKKdnOxjY8JTsVXrupYtyHQH82FQEuMPbYWrJRT-j1E5kv6IzXJA"
                alt={artisanNameEn}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col min-w-0">
              <h3 className="text-lg font-bold text-white leading-tight">
                {artisanNameHi} ({artisanNameEn})
              </h3>
              <p className="text-xs text-primary-fixed font-semibold mt-0.5">{craftTypeHi}</p>
              <p className="text-[11px] text-white/70 font-medium">{artisanLocation}</p>
            </div>
          </div>

          {/* Card Footer Details */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15 text-xs">
            <div>
              <span className="text-[10px] text-white/60 block font-medium">Artisan ID / आईडी संख्या:</span>
              <span className="font-bold text-white tracking-wide">{vishwakarmaId}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-white/60 block font-medium">GI Tag Status:</span>
              <span className="font-bold text-tertiary-fixed-dim">जीआई प्रमाणित (Authentic)</span>
            </div>
          </div>
        </div>

        {/* Direct Bank Transfer (DBT) Payout Section */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest-green/15 text-forest-green flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance_wallet
                </span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-on-surface">डीबीटी बैंक खाता ट्रांसफर</h4>
                <p className="text-[10px] text-on-surface-variant font-medium">Direct Bank Transfer Status</p>
              </div>
            </div>
            <span className="text-xs font-bold text-forest-green bg-forest-green/10 px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-outline-variant/20">
            <div className="flex justify-between items-center text-xs">
              <span className="text-on-surface-variant font-medium">संबद्ध बैंक (Linked Bank):</span>
              <span className="text-on-surface font-bold">State Bank of India (SBI)</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-on-surface-variant font-medium">खाता संख्या (A/C No):</span>
              <span className="text-on-surface font-bold">XXXX-XXXX-8821</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-outline-variant/20">
              <span className="text-on-surface-variant font-medium">कुल जमा (Total Payout):</span>
              <span className="text-sm font-bold text-forest-green">₹{totalEarnings.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Certificates & Download Actions */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2.5">
          <span className="text-xs font-bold text-on-surface">
            सरकारी प्रमाण पत्र एवं सहायता / Certificates &amp; Support
          </span>

          {/* Action 1 */}
          <button
            onClick={() => handleDownloadCert('विश्वकर्मा टूलकिट प्रमाण पत्र')}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left active:scale-[0.99]"
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              </div>
              <div>
                <span className="text-xs font-bold text-on-surface block">विश्वकर्मा प्रमाण पत्र</span>
                <span className="text-[10px] text-on-surface-variant font-medium">Toolkit Certificate PDF</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">download</span>
          </button>

          {/* Action 2 */}
          <button
            onClick={() => handleDownloadCert('जीआई टैग प्रमाण पत्र')}
            className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left active:scale-[0.99]"
            type="button"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div>
                <span className="text-xs font-bold text-on-surface block">जीआई टैग प्रामाणिकता पत्र</span>
                <span className="text-[10px] text-on-surface-variant font-medium">GI Authenticity Card</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">download</span>
          </button>

          {/* Action 3 Helpline */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-primary-fixed/30 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">headset_mic</span>
              </div>
              <div>
                <span className="text-xs font-bold text-primary block">कारीगर हेल्पलाइन टोल-फ्री</span>
                <span className="text-[10px] text-on-surface-variant font-medium">1800-180-2024 (24x7 Support)</span>
              </div>
            </div>
            <a
              href="tel:18001802024"
              className="px-3 py-1 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-xs"
            >
              कॉल करें
            </a>
          </div>
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
