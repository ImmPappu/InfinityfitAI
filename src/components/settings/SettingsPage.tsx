import React from 'react';
import { Settings as SettingsIcon, Globe, Scale, RefreshCw } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { LanguageSelector } from '../layout/LanguageSelector';

export const SettingsPage: React.FC = () => {
  const { unitSystem, setUnitSystem } = useUser();

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all stored demo data and preferences?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl shadow-xl flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <SettingsIcon className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-white">Platform Settings</h2>
          <p className="text-xs text-slate-400">Configure multi-language, measurement units, and local storage data.</p>
        </div>
      </div>

      <div className="space-y-4">
        
        {/* Multi-Language Selector */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Multi-Language Dictionary</span>
            </h3>
            <p className="text-xs text-slate-400">Switch instantly between English, Hindi, Spanish, French, German.</p>
          </div>
          <LanguageSelector />
        </div>

        {/* Measurement Units */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              <span>Measurement Unit System</span>
            </h3>
            <p className="text-xs text-slate-400">Metric (kg, cm) vs Imperial (lbs, ft-in).</p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                unitSystem === 'metric' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Metric (kg/cm)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                unitSystem === 'imperial' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              Imperial (lbs/ft)
            </button>
          </div>
        </div>

        {/* Reset Demo Data */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/[0.08] backdrop-blur-xl shadow-xl flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-rose-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-400" />
              <span>Reset Local Application State</span>
            </h3>
            <p className="text-xs text-slate-400">Clear stored profile settings, logs, and reset onboarding.</p>
          </div>

          <button
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all"
          >
            Reset All Data
          </button>
        </div>

      </div>
    </div>
  );
};
