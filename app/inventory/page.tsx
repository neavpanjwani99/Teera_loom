'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useArtisan } from '../../context/ArtisanContext';

export default function InventoryPage() {
  const { products, toggleProductStatus, deleteProduct, speakText } = useArtisan();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'out_of_stock' | 'draft'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesTab = activeTab === 'all' || p.status === activeTab;
    const matchesSearch =
      p.titleHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleToggleStatus = (productId: string, currentStatus: string) => {
    toggleProductStatus(productId);
    const nextStatusText =
      currentStatus === 'active'
        ? 'उत्पाद का स्टेटस आउट ऑफ स्टॉक कर दिया गया है'
        : currentStatus === 'out_of_stock'
        ? 'उत्पाद को ड्राफ्ट में बदला गया है'
        : 'उत्पाद को लाइव प्रकाशित कर दिया गया है';
    speakText(nextStatusText);
  };

  const handleDeleteProduct = (productId: string, titleHi: string) => {
    if (confirm(`क्या आप "${titleHi}" को हटाना चाहते हैं?`)) {
      deleteProduct(productId);
      speakText(`उत्पाद हटा दिया गया है।`);
    }
  };

  const handleShareProduct = (titleHi: string, price: number) => {
    const text = encodeURIComponent(
      `*${titleHi}*\nमूल्य: ₹${price}\nजीआई टैग प्रमाणित हस्तशिल्प। टेरा लूम पर देखें और ऑर्डर करें!`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-24">
      <Header
        title="उत्पाद इन्वेंटरी"
        subtitle="My Crafts &amp; Product Catalog"
        speechTextHi="यहाँ आपकी सभी लाइव, ड्राफ्ट और आउट ऑफ स्टॉक हस्तशिल्प सूची है। आप किसी भी समय स्टेटस बदल सकते हैं।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Top Add Craft Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-on-surface">कुल {products.length} उत्पाद सूचीबद्ध हैं</h2>
            <p className="text-xs text-on-surface-variant font-medium">ONDC marketplace synchronized</p>
          </div>

          <Link
            href="/create/camera"
            className="h-10 px-3.5 bg-primary text-on-primary rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>नया जोड़ें</span>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-10 pr-4 rounded-xl border border-outline-variant/40 focus:border-primary text-xs font-medium text-on-surface bg-surface-container-lowest outline-none shadow-xs"
            placeholder="उत्पाद या श्रेणी खोजें / Search inventory..."
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            सभी (All {products.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'active'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            लाइव (Active {products.filter((p) => p.status === 'active').length})
          </button>
          <button
            onClick={() => setActiveTab('out_of_stock')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'out_of_stock'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            आउट ऑफ स्टॉक ({products.filter((p) => p.status === 'out_of_stock').length})
          </button>
          <button
            onClick={() => setActiveTab('draft')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
              activeTab === 'draft'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            ड्राफ्ट (Drafts {products.filter((p) => p.status === 'draft').length})
          </button>
        </div>

        {/* Product Cards List */}
        <div className="flex flex-col gap-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-8 text-center text-on-surface-variant border border-outline-variant/30 flex flex-col items-center gap-2">
              <span className="material-symbols-outlined text-[48px] opacity-40">inventory_2</span>
              <p className="text-sm font-bold text-on-surface">कोई उत्पाद नहीं मिला</p>
              <p className="text-xs">No products match your search or filter.</p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-surface-container-lowest rounded-2xl p-3 border border-outline-variant/30 shadow-sm flex gap-3 relative"
              >
                {/* Thumbnail */}
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-surface-container-low">
                  <img
                    src={product.imageUrl}
                    alt={product.titleEn}
                    className="w-full h-full object-cover"
                  />
                  {product.giTag && (
                    <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary text-[9px] font-bold shadow-xs border border-primary/20">
                      GI Tag
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-col flex-1 min-w-0 justify-between py-0.5">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-bold text-secondary uppercase">
                        {product.category}
                      </span>

                      {/* Interactive Status Toggle Switch */}
                      <button
                        onClick={() => handleToggleStatus(product.id, product.status)}
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-transform active:scale-95 cursor-pointer flex items-center gap-1 ${
                          product.status === 'active'
                            ? 'bg-forest-green/15 text-forest-green border border-forest-green/30'
                            : product.status === 'out_of_stock'
                            ? 'bg-error-container text-on-error-container border border-error/30'
                            : 'bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/30'
                        }`}
                        title="Click to toggle status"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        <span>
                          {product.status === 'active'
                            ? 'लाइव (Active)'
                            : product.status === 'out_of_stock'
                            ? 'आउट ऑफ स्टॉक'
                            : 'ड्राफ्ट (Draft)'}
                        </span>
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-on-surface leading-tight mt-1 truncate">
                      {product.titleHi}
                    </h3>
                    <p className="text-xs text-on-surface-variant truncate">{product.titleEn}</p>
                    <p className="text-[10px] text-outline font-medium mt-0.5">
                      स्टॉक: {product.stock > 0 ? `${product.stock} पीस` : '0 पीस'}
                    </p>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-outline-variant/20">
                    <span className="text-base font-bold text-primary">
                      ₹{product.price.toLocaleString('en-IN')}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Audio Reader */}
                      <button
                        onClick={() =>
                          speakText(
                            `${product.titleHi}, मूल्य ₹${product.price}, स्टेटस ${
                              product.status === 'active' ? 'लाइव' : 'आउट ऑफ स्टॉक'
                            }`
                          )
                        }
                        className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-transform cursor-pointer"
                        title="Listen details"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">volume_up</span>
                      </button>

                      {/* WhatsApp Share */}
                      <button
                        onClick={() => handleShareProduct(product.titleHi, product.price)}
                        className="w-8 h-8 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center hover:bg-surface-container-highest active:scale-95 transition-transform cursor-pointer"
                        title="Share on WhatsApp"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">share</span>
                      </button>

                      {/* Delete Action */}
                      <button
                        onClick={() => handleDeleteProduct(product.id, product.titleHi)}
                        className="w-8 h-8 rounded-lg bg-error-container/60 text-error flex items-center justify-center hover:bg-error-container active:scale-95 transition-transform cursor-pointer"
                        title="Delete item"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </main>
  );
}
