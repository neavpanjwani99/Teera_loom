'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function CameraViewfinderPage() {
  const router = useRouter();
  const { updateWizard, speakText } = useArtisan();
  const [flashMode, setFlashMode] = useState<'auto' | 'on' | 'off'>('auto');
  const [cameraMode, setCameraMode] = useState<'single' | '360' | 'texture'>('single');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCapture = () => {
    speakText("फोटो खींची गई! AI स्टूडियो प्रोसेसिंग शुरू हो रही है।");
    router.push('/create/processing');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          updateWizard({
            photoUrl: event.target.result as string,
            enhancedPhotoUrl: event.target.result as string,
          });
          speakText("फोटो चुनी गई! AI स्टूडियो प्रोसेसिंग शुरू हो रही है।");
          router.push('/create/processing');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="flex flex-col relative w-full bg-inverse-surface min-h-screen pt-16 pb-6 text-inverse-on-surface">
      <Header
        title="क्राफ्ट कैमरा"
        subtitle="AI Studio Photo Capture"
        showBack
        speechTextHi="उत्पाद को फ्रेम के अंदर रखें और अच्छी रोशनी दें।"
      />

      <div className="flex flex-col w-full px-4 pt-3 pb-4 flex-1 justify-between select-none">
        {/* Hidden File Input for Gallery Upload Fallback */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Viewfinder Frame */}
        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-black border border-outline-variant/30 flex flex-col justify-between">
          {/* Background Camera Image Preview */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 transform scale-100"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1dqIARw-1xwjhImYi0ed79aPZugCiKHaooqJM9bhSX0ocqPxRxP7wjFizIBLafRT-SoIeAg8XI0dWrrjwVhw9guXylvOdkLQHhRXclIWT92fr22mrAZedkJOtBiTyE6pi8hkokqQx6XLAGVKiMW9Ev9UfcL92vcY1E5O2U6wqurHFCuAwem1-NdYkx2gClUTjlNl1ncyxwiOS3Wj4vez2_b-yxoWTR2yGNPciA1M806vw8I3dtWgi')",
            }}
          ></div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none"></div>

          {/* Top Bar inside Viewfinder */}
          <div className="relative z-20 p-3 flex items-center justify-between">
            {/* Lighting Sensor Meter */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md text-xs font-bold shadow-sm">
              <span className="material-symbols-outlined text-primary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                wb_sunny
              </span>
              <span>रोशनी: उत्तम (94%)</span>
              <span className="w-2 h-2 rounded-full bg-forest-green animate-pulse ml-1"></span>
            </div>

            {/* Flash & Audio Coach */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setFlashMode((prev) => (prev === 'auto' ? 'on' : prev === 'on' ? 'off' : 'auto'))
                }
                className="w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center active:scale-90 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {flashMode === 'auto' ? 'flash_auto' : flashMode === 'on' ? 'flash_on' : 'flash_off'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => speakText("उत्पाद को फ्रेम के बीच में रखें और कैमरा स्थिर रखें।")}
                className="h-10 px-3 rounded-full bg-tertiary text-on-tertiary backdrop-blur-md flex items-center gap-1 text-xs font-bold active:scale-95 shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
                <span>सुनें</span>
              </button>
            </div>
          </div>

          {/* Framing Guides & Reticle */}
          <div className="relative z-10 flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-[260px] aspect-[4/5] flex items-center justify-center">
              <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-white/40 pointer-events-none"></div>

              {/* Corner Brackets */}
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>

              {/* Center Reticle */}
              <div className="relative flex items-center justify-center w-10 h-10 opacity-70 pointer-events-none">
                <div className="w-3 h-0.5 bg-white rounded-full"></div>
                <div className="h-3 w-0.5 bg-white rounded-full absolute"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-white absolute"></div>
              </div>

              {/* TerraLoom AI Vision Watermark */}
              <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none">
                <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/70 text-white backdrop-blur-sm text-[10px] uppercase font-bold">
                  <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span>Terra Loom AI Vision Assist</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Mode Selector Pills */}
          <div className="relative z-20 pb-3 flex justify-center gap-2">
            <button
              onClick={() => setCameraMode('single')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                cameraMode === 'single'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-black/60 text-white/80'
              }`}
            >
              एक फोटो / Single
            </button>
            <button
              onClick={() => setCameraMode('360')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                cameraMode === '360'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-black/60 text-white/80'
              }`}
            >
              360° घुमावदार
            </button>
            <button
              onClick={() => setCameraMode('texture')}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                cameraMode === 'texture'
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'bg-black/60 text-white/80'
              }`}
            >
              नक्काशी / Texture
            </button>
          </div>
        </div>

        {/* Shutter Deck */}
        <div className="flex items-center justify-around w-full max-w-sm mx-auto pt-4">
          {/* Gallery Button */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-14 h-14 rounded-2xl bg-surface-container-lowest/20 text-white backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-all border border-white/20"
              type="button"
              title="Gallery Upload"
            >
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                photo_library
              </span>
            </button>
            <span className="text-[11px] font-medium text-white/90">गैलरी (Gallery)</span>
          </div>

          {/* Center Shutter Button */}
          <button
            onClick={handleCapture}
            className="group relative w-20 h-20 rounded-full bg-primary p-1 shadow-2xl active:scale-90 transition-all duration-150 flex items-center justify-center cursor-pointer ring-4 ring-primary/40"
            type="button"
            aria-label="Capture photo"
          >
            <div className="w-full h-full rounded-full bg-surface-container-lowest group-active:bg-primary-fixed flex items-center justify-center transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary group-active:scale-90 transition-transform"></div>
            </div>
          </button>

          {/* Flip Camera */}
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={() => alert('कैमरा बदला गया (Camera Switched)')}
              className="w-14 h-14 rounded-2xl bg-surface-container-lowest/20 text-white backdrop-blur-md flex items-center justify-center shadow-md active:scale-90 transition-all border border-white/20"
              type="button"
              title="Flip Camera"
            >
              <span className="material-symbols-outlined text-[28px]">flip_camera_ios</span>
            </button>
            <span className="text-[11px] font-medium text-white/90">बदलें (Flip)</span>
          </div>
        </div>
      </div>
    </main>
  );
}
