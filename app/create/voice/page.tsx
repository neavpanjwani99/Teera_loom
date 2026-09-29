'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function VoiceRecordingPage() {
  const { wizard, updateWizard, speakText, isSpeaking } = useArtisan();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState(wizard.voiceTranscriptHi || 'यह एक हाथ से बना मिट्टी का दीपक पात्र है, जिस पर गंगा माटी की नक्काशी और शुद्ध प्राकृतिक रंग का प्रयोग किया गया है।');

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      speakText("रिकॉर्डिंग शुरू हो गई है। बोलना शुरू करें।");
      setTimeout(() => {
        setIsRecording(false);
        speakText("रिकॉर्डिंग पूर्ण हो गई है। विवरण सहेज लिया गया है।");
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleTextChange = (newText: string) => {
    setTranscript(newText);
    updateWizard({ voiceTranscriptHi: newText });
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-20">
      <Header
        title="आवाज़ रिकॉर्डिंग"
        subtitle="Describe Craft in Vernacular Voice"
        showBack
        speechTextHi="माइक बटन दबाएं और अपनी भाषा में उत्पाद की खासियत, समय व बनाने की विधि बोलकर बताएं।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Instruction Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              mic
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-on-surface">बोलकर विवरण दें</h2>
            <p className="text-xs text-on-surface-variant font-medium">Speak naturally in Hindi/Bengali/Tamil</p>
          </div>
        </div>

        {/* Central Mic Pulse Recorder Surface */}
        <div className="bg-surface-container-lowest rounded-3xl p-6 border border-outline-variant/30 shadow-md flex flex-col items-center text-center relative overflow-hidden">
          <span className="text-xs font-bold text-on-surface mb-2">
            {isRecording ? 'आपकी आवाज़ रिकॉर्ड की जा रही है...' : 'माइक दबाकर बोलना शुरू करें'}
          </span>

          {/* Big Mic Button */}
          <div className="relative flex items-center justify-center my-4">
            {isRecording && (
              <>
                <div className="absolute w-36 h-36 rounded-full bg-primary/20 animate-ping"></div>
                <div className="absolute w-28 h-28 rounded-full bg-primary/30 animate-pulse"></div>
              </>
            )}

            <button
              onClick={toggleRecording}
              className={`w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl active:scale-90 transition-all z-10 cursor-pointer ${
                isRecording
                  ? 'bg-primary text-on-primary ring-4 ring-primary/40'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
              type="button"
              aria-label="Toggle mic recording"
            >
              <span className="material-symbols-outlined text-[44px]">
                {isRecording ? 'graphic_eq' : 'mic'}
              </span>
              <span className="text-[10px] font-bold tracking-wider mt-0.5">
                {isRecording ? 'रिकॉर्डिंग...' : 'टैप करें'}
              </span>
            </button>
          </div>

          {/* Audio Wave Visualizer Simulation */}
          {isRecording ? (
            <div className="flex items-center gap-1.5 h-8 my-2">
              <span className="w-1 bg-primary h-6 rounded-full animate-bounce"></span>
              <span className="w-1 bg-primary h-8 rounded-full animate-bounce delay-100"></span>
              <span className="w-1 bg-primary h-4 rounded-full animate-bounce delay-200"></span>
              <span className="w-1 bg-primary h-7 rounded-full animate-bounce delay-300"></span>
              <span className="w-1 bg-primary h-5 rounded-full animate-bounce delay-150"></span>
            </div>
          ) : (
            <p className="text-xs text-on-surface-variant font-medium my-2">
              उदाहरण: &ldquo;यह बनारसी काढ़वा सिल्क साड़ी है, 15 दिन में तैयार की गई है।&rdquo;
            </p>
          )}
        </div>

        {/* Live Audio Transcription Box */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">subtitles</span>
              लाइव टेक्स्ट विवरण (Speech to Text)
            </span>
            <button
              onClick={() => speakText(transcript)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm ${
                isSpeaking
                  ? 'bg-primary text-on-primary'
                  : 'bg-tertiary-fixed text-on-tertiary-fixed'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">volume_up</span>
              <span>सुनें</span>
            </button>
          </div>

          <textarea
            rows={3}
            value={transcript}
            onChange={(e) => handleTextChange(e.target.value)}
            className="w-full p-3 rounded-xl border border-outline-variant/40 focus:border-primary text-sm font-medium text-on-surface bg-surface-container-low outline-none resize-none"
            placeholder="आपकी आवाज़ का विवरण यहां दिखेगा..."
          />
        </div>

        {/* Next Step CTA */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto p-4 bg-surface/95 backdrop-blur-md border-t border-outline-variant/20 z-40">
          <Link
            href="/create/description"
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
          >
            <span>एआई कहानी बनाएं • Generate AI Story</span>
            <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
