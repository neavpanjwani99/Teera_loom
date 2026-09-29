'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

const craftCategories = [
  {
    id: 'handloom',
    titleHi: 'हथकरघा व रेशम बुनाई',
    titleEn: 'Handloom & Silk Weaving',
    icon: 'strikethrough_s',
    badge: 'PM Vishwakarma',
    descHi: 'बनारसी, चंदेरी, कांजीवरम व सूती वस्त्र',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf_dwPgjCDx1nmh8Nxa5chUCMmhh3ltjM7kuQ-HZ3GFY5T-Ll_opK8c8b3ZqSZ4cypNOBdbFwiY1bGVL5BRrBOZ4OxC75Xjf82CNrjCbrwGWbsRiS04JrOyAp3EqNaHLmewrABzCR_1XxYDd456Y-JXeOVDWGFZZ2dlg7CvCHNwmqnzYW7QwejN9kMYzVVqOmtXCDPAC4muh3_IxiRH5wRRcDDqWw8GzQI3Xs9Pgi08U4qohUiSt8G',
  },
  {
    id: 'pottery',
    titleHi: 'मिट्टी के बर्तन व टेराकोटा',
    titleEn: 'Pottery & Terracotta',
    icon: 'potted_plant',
    badge: 'ODOP Verified',
    descHi: 'कुम्हार कला, मिट्टी बर्तन व सजावटी कलश',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1dqIARw-1xwjhImYi0ed79aPZugCiKHaooqJM9bhSX0ocqPxRxP7wjFizIBLafRT-SoIeAg8XI0dWrrjwVhw9guXylvOdkLQHhRXclIWT92fr22mrAZedkJOtBiTyE6pi8hkokqQx6XLAGVKiMW9Ev9UfcL92vcY1E5O2U6wqurHFCuAwem1-NdYkx2gClUTjlNl1ncyxwiOS3Wj4vez2_b-yxoWTR2yGNPciA1M806vw8I3dtWgi',
  },
  {
    id: 'block_print',
    titleHi: 'हाथ ब्लॉक प्रिंटिंग',
    titleEn: 'Hand Block Printing',
    icon: 'format_paint',
    badge: 'GI Tagged',
    descHi: 'अजरख, सांगानेरी व बगरू छपाई',
    img: 'https://images.unsplash.com/photo-1606744888344-49423b7413f2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'brassware',
    titleHi: 'पीतल व धातु शिल्प',
    titleEn: 'Brassware & Metalwork',
    icon: 'precision_manufacturing',
    badge: 'PM Vishwakarma',
    descHi: 'मुरादाबादी पीतल, ढोक्रा व कांसा',
    img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'woodcraft',
    titleHi: 'लकड़ी की नक्काशी',
    titleEn: 'Woodcarving & Wooden Toys',
    icon: 'carpenter',
    badge: 'National Award',
    descHi: 'सहारनपुर नक्काशी व चन्नापटना खिलौने',
    img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'zari',
    titleHi: 'जरी व कसीदाकारी',
    titleEn: 'Zari & Embroidery',
    icon: 'checkroom',
    badge: 'Govt Approved',
    descHi: 'जरदोजी, चिकनकारी व सुजनी कढ़ाई',
    img: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
  },
];

export default function CraftTypeSelectionPage() {
  const { speakText } = useArtisan();
  const [selectedCraft, setSelectedCraft] = useState<string>('handloom');

  const handleCraftSelect = (craft: typeof craftCategories[0]) => {
    setSelectedCraft(craft.id);
    speakText(`आपने ${craft.titleHi} चुना है। आगे बढ़ने के लिए नीचे हरा बटन दबाएं।`);
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-20">
      <Header
        title="शिल्प विधा चुनें"
        subtitle="Select Craft Discipline"
        showBack
        speechTextHi="कृपया अपनी प्राथमिक कला या शिल्प श्रेणी चुनें ताकि हम आपके लिए सही बाज़ार सुझाव ला सकें।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Info Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">palette</span>
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface">आपकी मुख्य कला क्या है?</h2>
              <p className="text-xs text-on-surface-variant font-medium">Choose primary craft category</p>
            </div>
          </div>
        </div>

        {/* Craft Cards List */}
        <div className="grid grid-cols-1 gap-3">
          {craftCategories.map((craft) => {
            const isSelected = selectedCraft === craft.id;
            return (
              <button
                key={craft.id}
                onClick={() => handleCraftSelect(craft)}
                className={`flex items-center gap-3.5 p-3 rounded-2xl border transition-all text-left relative cursor-pointer active:scale-[0.99] ${
                  isSelected
                    ? 'bg-surface-container-lowest border-2 border-primary shadow-md ring-2 ring-primary/20'
                    : 'bg-surface-container-lowest border-outline-variant/30 hover:border-primary/40 shadow-sm'
                }`}
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative bg-surface-container">
                  <img
                    src={craft.img}
                    alt={craft.titleEn}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-[1px]">
                      <span className="material-symbols-outlined text-on-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-secondary px-2 py-0.5 rounded-full bg-secondary-fixed">
                      {craft.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-on-surface leading-tight">{craft.titleHi}</h3>
                  <p className="text-xs font-medium text-on-surface-variant leading-tight mt-0.5">{craft.titleEn}</p>
                  <p className="text-[11px] text-outline mt-1 truncate">{craft.descHi}</p>
                </div>

                <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                  <span className="material-symbols-outlined text-[20px]">
                    {isSelected ? 'radio_button_checked' : 'radio_button_unchecked'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <Link
            href="/onboarding/login"
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
