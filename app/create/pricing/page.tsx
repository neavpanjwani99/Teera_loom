'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function DynamicPricingPage() {
  const { wizard, updateWizard, speakText } = useArtisan();

  const [materialCost, setMaterialCost] = useState<number>(wizard.materialCost || 250);
  const [craftHours, setCraftHours] = useState<number>(wizard.craftHours || 8);
  const [hourlyRate, setHourlyRate] = useState<number>(wizard.hourlyRate || 150);
  const [overheadCost, setOverheadCost] = useState<number>(wizard.overheadCost || 100);
  const [profitMargin, setProfitMargin] = useState<number>(25); // percentage
  const [stockQty, setStockQty] = useState<number>(wizard.stockQty || 5);

  // Live Formula Calculation
  const laborCost = craftHours * hourlyRate;
  const baseTotalCost = materialCost + laborCost + overheadCost;
  const calculatedPrice = Math.round(baseTotalCost * (1 + profitMargin / 100));

  const handleUpdate = () => {
    updateWizard({
      materialCost,
      craftHours,
      hourlyRate,
      overheadCost,
      calculatedPrice,
      stockQty,
    });
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-24">
      <Header
        title="स्मार्ट मूल्य निर्धारण"
        subtitle="Fair Market Price Calculator"
        showBack
        speechTextHi={`आपकी कच्ची सामग्री लागत ₹${materialCost}, ${craftHours} घंटे का श्रम और पैकिंग खर्च मिलाकर अनुशंसित उचित मूल्य ₹${calculatedPrice} बनता है।`}
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Info Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">calculate</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">उचित मूल्य कैलकुलेटर</h2>
              <p className="text-xs text-on-surface-variant font-medium">Cost Breakdown &amp; Fair Profit Margin</p>
            </div>
          </div>
          <button
            onClick={() => speakText(`सामग्री लागत, श्रम समय और लाभ दर मिलाकर उचित मूल्य की गणना करें।`)}
            className="px-3 py-1.5 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">volume_up</span>
            <span>सुनें</span>
          </button>
        </div>

        {/* Highlight Recommended Price Card */}
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-5 text-on-primary shadow-lg border border-primary-container">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs font-bold text-on-primary/90 uppercase tracking-wider block">
                अनुशंसित बिक्री मूल्य / Fair Price
              </span>
              <div className="text-3xl font-bold text-on-primary mt-1">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary text-xs font-bold shadow-sm">
              ONDC अनुमोदित
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-on-primary/20 text-xs">
            <div>
              <span className="opacity-80 block">कच्ची लागत (Base Cost):</span>
              <span className="font-bold">₹{baseTotalCost}</span>
            </div>
            <div>
              <span className="opacity-80 block">शुद्ध लाभ (Net Profit):</span>
              <span className="font-bold text-tertiary-fixed-dim">
                ₹{calculatedPrice - baseTotalCost} ({profitMargin}%)
              </span>
            </div>
          </div>
        </div>

        {/* Sliders & Inputs */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-4">
          <span className="text-xs font-bold text-on-surface">
            लागत विवरण दर्ज करें / Cost Components
          </span>

          {/* 1. Material Cost */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-on-surface">
              <span>कच्ची सामग्री (Raw Material Cost):</span>
              <span className="text-primary font-bold">₹{materialCost}</span>
            </div>
            <input
              type="range"
              min={50}
              max={2000}
              step={25}
              value={materialCost}
              onChange={(e) => {
                setMaterialCost(Number(e.target.value));
                handleUpdate();
              }}
              className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
            />
          </div>

          {/* 2. Craft Hours Worked */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-on-surface">
              <span>काम के घंटे (Craft Hours Worked):</span>
              <span className="text-primary font-bold">{craftHours} घंटे (Hours)</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={craftHours}
              onChange={(e) => {
                setCraftHours(Number(e.target.value));
                handleUpdate();
              }}
              className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
            />
          </div>

          {/* 3. Hourly Rate */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-bold text-on-surface">
              <span>कारीगर मजदूरी दर (Hourly Wage):</span>
              <span className="text-primary font-bold">₹{hourlyRate} / घंटा</span>
            </div>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={hourlyRate}
              onChange={(e) => {
                setHourlyRate(Number(e.target.value));
                handleUpdate();
              }}
              className="w-full accent-primary h-2 bg-surface-container-high rounded-lg cursor-pointer"
            />
          </div>

          {/* 4. Overhead & Shipping */}
          <div className="flex justify-between items-center text-xs pt-1 border-t border-outline-variant/20">
            <span className="font-bold text-on-surface">पैकिंग व शिपिंग खर्च (Overhead):</span>
            <input
              type="number"
              value={overheadCost}
              onChange={(e) => {
                setOverheadCost(Number(e.target.value));
                handleUpdate();
              }}
              className="w-24 h-9 px-2 rounded-lg border border-outline-variant text-right font-bold text-on-surface bg-surface-container-low"
            />
          </div>

          {/* 5. Target Profit Margin Slider */}
          <div className="flex flex-col gap-1.5 pt-2 border-t border-outline-variant/20">
            <div className="flex justify-between text-xs font-bold text-on-surface">
              <span>मुनाफा दर (Target Profit Margin):</span>
              <span className="text-forest-green font-bold">{profitMargin}% Margin</span>
            </div>
            <input
              type="range"
              min={5}
              max={60}
              step={5}
              value={profitMargin}
              onChange={(e) => {
                setProfitMargin(Number(e.target.value));
                handleUpdate();
              }}
              className="w-full accent-forest-green h-2 bg-surface-container-high rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Market Price Benchmarks Comparison */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2.5">
          <span className="text-xs font-bold text-on-surface">
            बाज़ार तुलना बेंचमार्क / Market Price Benchmarks
          </span>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="text-[10px] text-on-surface-variant font-medium block">स्थानीय बाज़ार</span>
              <span className="font-bold text-on-surface">₹1,200 - ₹1,400</span>
            </div>

            <div className="p-2.5 rounded-xl bg-primary-fixed/40 border border-primary/40">
              <span className="text-[10px] text-primary font-bold block">फेयर ट्रेड (ONDC)</span>
              <span className="font-bold text-primary text-sm">₹{calculatedPrice}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30">
              <span className="text-[10px] text-on-surface-variant font-medium block">जीआई शोरूम</span>
              <span className="font-bold text-on-surface">₹1,800 - ₹2,200</span>
            </div>
          </div>
        </div>

        {/* Stock Quantity */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-on-surface block">उपलब्ध स्टॉक मात्रा (Available Stock)</span>
            <span className="text-[11px] text-on-surface-variant">कितने पीस बिक्री के लिए तैयार हैं?</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setStockQty((prev) => Math.max(1, prev - 1))}
              className="w-9 h-9 rounded-xl bg-surface-container-high font-bold text-lg text-on-surface active:scale-95"
            >
              -
            </button>
            <span className="text-base font-bold text-primary w-6 text-center">{stockQty}</span>
            <button
              onClick={() => setStockQty((prev) => prev + 1)}
              className="w-9 h-9 rounded-xl bg-surface-container-high font-bold text-lg text-on-surface active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <Link
            href="/create/preview"
            onClick={handleUpdate}
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
          >
            <span>अंतिम पूर्वावलोकन • Final Preview</span>
            <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
