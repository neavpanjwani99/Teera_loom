'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../../components/Header';
import { useArtisan } from '../../../context/ArtisanContext';

export default function MobileLoginPage() {
  const router = useRouter();
  const { speakText } = useArtisan();
  const [mobileNumber, setMobileNumber] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['4', '8', '8', '4']);
  const [loginMethod, setLoginMethod] = useState<'mobile' | 'artisan_card'>('mobile');
  const [artisanCardId, setArtisanCardId] = useState('VK-VAR-2024-8841');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('कृपया 10 अंकों का वैध मोबाइल नंबर दर्ज करें (Please enter valid 10-digit mobile number)');
      return;
    }
    setLoading(true);
    speakText("ओटीपी भेजा जा रहा है। कृपया 4 अंकों का कोड दर्ज करें।");
    setTimeout(() => {
      setLoading(false);
      setOtpSent(true);
    }, 800);
  };

  const handleVerifyLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    speakText("प्रवेश सफल! आपके डैशबोर्ड पर जा रहे हैं।");
    setTimeout(() => {
      setLoading(false);
      router.push('/dashboard');
    }, 800);
  };

  return (
    <main className="flex flex-col relative w-full bg-surface min-h-screen pt-16 pb-20">
      <Header
        title="कारीगर प्रवेश"
        subtitle="Artisan Login & Verification"
        showBack
        speechTextHi="अपना मोबाइल नंबर दर्ज करें या पीएम विश्वकर्मा कार्ड नंबर से लॉगिन करें।"
      />

      <div className="flex flex-col w-full p-4 gap-4">
        {/* Identity Trust Banner */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              badge
            </span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-on-surface">सरकारी कल्याणकारी पोर्टल</h2>
            <p className="text-xs text-on-surface-variant font-medium">Verified Direct Bank Transfer Access</p>
          </div>
        </div>

        {/* Login Method Toggle */}
        <div className="flex bg-surface-container-low p-1 rounded-xl border border-outline-variant/30">
          <button
            type="button"
            onClick={() => setLoginMethod('mobile')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              loginMethod === 'mobile'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            मोबाइल नंबर (Mobile OTP)
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('artisan_card')}
            className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all ${
              loginMethod === 'artisan_card'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            विश्वकर्मा कार्ड (Artisan ID)
          </button>
        </div>

        {/* Form Container */}
        <form onSubmit={handleVerifyLogin} className="flex flex-col gap-4">
          {loginMethod === 'mobile' ? (
            <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-3">
              <label className="text-xs font-bold text-on-surface">
                मोबाइल नंबर दर्ज करें / Enter Mobile Number
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-sm font-bold text-on-surface-variant">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="w-full h-14 pl-14 pr-4 rounded-xl border-2 border-outline-variant/40 focus:border-primary text-lg font-bold text-on-surface bg-surface-container-low outline-none transition-colors"
                  placeholder="98765 43210"
                />
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full h-12 mt-2 bg-secondary text-on-secondary rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {loading ? 'ओटीपी भेजा जा रहा है...' : 'ओटीपी प्राप्त करें • Get OTP'}
                </button>
              ) : (
                <div className="flex flex-col gap-2 mt-2 animate-in fade-in">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-primary">
                      ओटीपी दर्ज करें (OTP Sent to +91 {mobileNumber})
                    </label>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="text-xs text-secondary font-bold underline"
                    >
                      पुनः भेजें (Resend)
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5 my-1">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => {
                          const newOtp = [...otp];
                          newOtp[idx] = e.target.value;
                          setOtp(newOtp);
                        }}
                        className="h-14 text-center text-xl font-bold text-primary rounded-xl border-2 border-primary bg-surface-container-low outline-none"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 shadow-sm flex flex-col gap-3">
              <label className="text-xs font-bold text-on-surface">
                पीएम विश्वकर्मा / हस्तशिल्प आईडी नंबर
              </label>
              <input
                type="text"
                value={artisanCardId}
                onChange={(e) => setArtisanCardId(e.target.value)}
                className="w-full h-14 px-4 rounded-xl border-2 border-outline-variant/40 focus:border-primary text-base font-bold text-on-surface bg-surface-container-low outline-none uppercase tracking-wide"
                placeholder="VK-VAR-2024-XXXX"
              />
              <p className="text-[11px] text-on-surface-variant font-medium">
                * आपके पास सरकारी शिल्पकार पहचान पत्र होना चाहिए।
              </p>
            </div>
          )}

          {/* Verification Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface-variant border border-outline-variant/20">
            <span className="material-symbols-outlined text-forest-green text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified_user
            </span>
            <span className="text-xs font-medium">
              Aadhaar &amp; DBT Linked Direct Bank Account
            </span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-on-primary rounded-xl font-bold text-base shadow-md flex items-center justify-center gap-2 active:translate-y-0.5 transition-all hover:bg-primary-container"
          >
            <span>{loading ? 'सत्यापित किया जा रहा है...' : 'लॉगइन करें • Verify & Login'}</span>
            <span className="material-symbols-outlined text-[24px]">login</span>
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div className="pt-2 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-xs font-bold text-secondary underline hover:text-primary transition-colors"
          >
            त्वरित डेमो प्रवेश (Quick Demo Entry) →
          </button>
        </div>
      </div>
    </main>
  );
}
