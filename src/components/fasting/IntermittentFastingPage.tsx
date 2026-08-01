import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  Play, 
  Square, 
  Droplets, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Flame,
  ShieldCheck
} from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';
import { mockFastingPlans } from '../../data/mockData';

export const IntermittentFastingPage: React.FC = () => {
  const { fastingState, startFast, endFast } = useUser();
  const { t } = useLanguage();

  const [selectedProtocol, setSelectedProtocol] = useState(mockFastingPlans[0]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Live timer interval
  useEffect(() => {
    let interval: any = null;
    if (fastingState.isFasting && fastingState.startTime) {
      interval = setInterval(() => {
        const secs = Math.floor((Date.now() - fastingState.startTime!) / 1000);
        setElapsedSeconds(secs);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [fastingState]);

  const targetSeconds = (fastingState.protocolHours || 16) * 3600;
  const progressPercent = Math.min(100, Math.floor((elapsedSeconds / targetSeconds) * 100));

  const formatTime = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleFast = () => {
    if (fastingState.isFasting) {
      endFast();
    } else {
      startFast(selectedProtocol.fastingHours);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5" />
          <span>Clinical Fasting & Autophagy Engine</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight">
          {t('fastingTitle')}
        </h2>
        <p className="text-xs sm:text-sm text-[#6B7280] max-w-2xl font-medium">
          Optimize cellular repair, lower resting insulin levels, and accelerate targeted fat oxidation with interactive circular timer tracking.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LIVE CIRCULAR FASTING TIMER */}
        <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-[#E5E7EB] shadow-sm flex flex-col items-center justify-center space-y-6 text-center">
          
          <span className="text-xs font-black uppercase tracking-widest text-[#6B7280]">
            {fastingState.isFasting ? '🔥 Active Fast In Progress' : 'Fasting Timer Ready'}
          </span>

          {/* Circular SVG Ring */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                className="stroke-[#F8FAFC] fill-none"
                strokeWidth="16"
              />
              <circle
                cx="50%"
                cy="50%"
                r="42%"
                className="stroke-[#22C55E] fill-none transition-all duration-1000"
                strokeWidth="16"
                strokeDasharray="600"
                strokeDashoffset={600 - (600 * progressPercent) / 100}
                strokeLinecap="round"
              />
            </svg>

            <div className="absolute space-y-1">
              <span className="text-4xl sm:text-5xl font-black text-[#111827] font-mono tracking-tight block">
                {fastingState.isFasting ? formatTime(elapsedSeconds) : `${selectedProtocol.fastingHours}:00:00`}
              </span>
              <span className="text-xs font-bold text-[#22C55E] block">
                {progressPercent}% Autophagy Progress
              </span>
              <span className="text-[10px] text-[#6B7280] block">
                Target: {fastingState.protocolHours || selectedProtocol.fastingHours} Hours
              </span>
            </div>
          </div>

          {/* Start / Stop Fasting Button */}
          <button
            onClick={handleToggleFast}
            className={`px-8 py-4 rounded-2xl font-black text-sm shadow-sm transition-all flex items-center gap-3 ${
              fastingState.isFasting
                ? 'bg-rose-500 hover:bg-rose-600 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {fastingState.isFasting ? (
              <>
                <Square className="w-5 h-5 fill-white" />
                <span>{t('endFast')}</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-white" />
                <span>{t('startFast')} ({selectedProtocol.name})</span>
              </>
            )}
          </button>

          {/* Hydration Reminder During Fasting */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 max-w-md text-xs text-slate-400 flex items-center gap-3 text-left">
            <Droplets className="w-6 h-6 text-purple-400 shrink-0" />
            <p>
              <strong>Hydration Check:</strong> Drink water, sparkling water, or unsweetened herbal tea during your fast to prevent muscle fatigue.
            </p>
          </div>

        </div>

        {/* FASTING PROTOCOLS SELECTOR & TIPS */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <h3 className="text-base font-extrabold text-white">
              Select Fasting Protocol
            </h3>

            <div className="space-y-3">
              {mockFastingPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setSelectedProtocol(plan)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    selectedProtocol.id === plan.id
                      ? 'border-purple-500 bg-purple-500/10 text-white shadow-lg'
                      : 'border-slate-800 bg-slate-950/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{plan.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-extrabold text-[10px]">
                      {plan.fastingHours}h Fast
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Safety & Refeeding Guidelines</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {selectedProtocol.safetyTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-400 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};
