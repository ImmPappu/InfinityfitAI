import React, { useState } from 'react';
import { Bot, Send, Sparkles, HelpCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

export const AiCoachPage: React.FC = () => {
  const { profile, metrics } = useUser();
  const [inputQuery, setInputQuery] = useState('');
  const [activeResponse, setActiveResponse] = useState<string | null>(null);

  const exampleQuestions = [
    "High protein breakfast",
    "Weight loss tips",
    "Daily calories",
    "Muscle gain"
  ];

  const handleSend = (queryText?: string) => {
    const query = queryText || inputQuery;
    if (!query.trim()) return;

    // Direct clear answer based on user target
    let response = `For your ${profile.goal} goal (${metrics.dailyCalories} kcal / day target): `;
    const qLower = query.toLowerCase();

    if (qLower.includes('protein') || qLower.includes('breakfast')) {
      response += "Aim for 30-40g protein at breakfast. High-protein options include Paneer Bhurji with 2 whole eggs, Tofu Scramble, or Whey Isolate with Oats & Peanut Butter.";
    } else if (qLower.includes('weight loss')) {
      response += `Maintain your 500 kcal daily deficit (${metrics.dailyCalories} kcal), hydrate with ${metrics.idealWaterLiters}L water daily, and follow a 16:8 intermittent fasting window.`;
    } else if (qLower.includes('calories')) {
      response += `Your calculated BMR is ${metrics.bmr} kcal and TDEE is ${metrics.tdee} kcal. Your active daily target is ${metrics.dailyCalories} kcal.`;
    } else if (qLower.includes('muscle')) {
      response += `Consume ${metrics.proteinGrams}g protein daily (1.8g per kg bodyweight) combined with 4 days of progressive overload resistance training.`;
    } else {
      response += `Prioritize hitting your ${metrics.proteinGrams}g daily protein target, ${metrics.idealWaterLiters}L water intake, and 7.5 hours of restful sleep.`;
    }

    setActiveResponse(response);
    if (!queryText) setInputQuery('');
  };

  return (
    <div className="space-y-8 pb-16 max-w-3xl mx-auto">
      
      {/* AI Nutrition Assistant White Card */}
      <div className="bg-white border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 shadow-sm space-y-8 text-left">
        
        {/* Title & Header */}
        <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#111827]">
                AI Nutrition Assistant
              </h2>
              <p className="text-xs text-[#6B7280] font-medium mt-0.5">
                Ask anything about diet, calories, macros & workouts
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-[10px] font-extrabold text-[#6B7280] uppercase tracking-wider">
            Client Preview
          </span>
        </div>

        {/* Input Area */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#111827]">
            Ask Anything
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="e.g. What is my recommended daily protein target?"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="w-full pl-5 pr-28 py-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] text-sm font-semibold text-[#111827] focus:outline-none focus:border-[#22C55E]"
            />
            <button
              onClick={() => handleSend()}
              className="absolute right-2 px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16a34a] text-white font-extrabold text-xs transition-all shadow-xs flex items-center gap-1.5"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Active Query Answer (if asked) */}
        {activeResponse && (
          <div className="p-5 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs font-bold text-[#111827] leading-relaxed flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#22C55E] flex-shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] font-black uppercase text-[#22C55E] mb-1">FitBot Guidance</span>
              <span>{activeResponse}</span>
            </div>
          </div>
        )}

        {/* Example Questions Section */}
        <div className="space-y-3 pt-2">
          <span className="block text-xs font-bold uppercase tracking-wider text-[#6B7280]">
            Example Questions
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {exampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#22C55E]/40 hover:bg-[#F8FAFC] text-left text-xs font-bold text-[#111827] transition-all flex items-center justify-between group shadow-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="text-[#22C55E] font-black">•</span>
                  <span>{q}</span>
                </div>
                <HelpCircle className="w-3.5 h-3.5 text-[#6B7280] group-hover:text-[#22C55E] transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Backend Note */}
        <div className="pt-4 border-t border-[#E5E7EB] text-center">
          <p className="text-[11px] font-semibold text-[#6B7280]">
            Live conversational LLM backend integration active until main endpoint connects.
          </p>
        </div>

      </div>

    </div>
  );
};
