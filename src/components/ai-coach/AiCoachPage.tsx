import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles, User, Lightbulb, Zap, HelpCircle } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export const AiCoachPage: React.FC = () => {
  const { profile, metrics } = useUser();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${profile.name}! I am FitBot AI, your personal senior nutrition & athletic conditioning coach. I've analyzed your blueprint: Target Calories are ${metrics.dailyCalories} kcal with ${metrics.proteinGrams}g Protein for your ${profile.goal} weight goal. How can I guide your transformation today?`,
      timestamp: 'Just now'
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');

  const quickChips = [
    "What should I eat today?",
    "High protein foods list",
    "Weight loss tips for my goal",
    "Gym hypertrophy advice",
    "Yoga & morning flow benefits",
    "Healthy 15-min recipes",
    "Give me daily motivation"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');

    // Generate Contextual Response
    setTimeout(() => {
      let aiText = `Great question! Based on your target of ${metrics.dailyCalories} kcal and ${metrics.proteinGrams}g Protein:`;

      if (query.toLowerCase().includes('eat today') || query.toLowerCase().includes('recipes')) {
        aiText = `For your ${profile.goal} goal, I recommend a breakfast of Avocado & Spinach Protein Wrap (26g Protein), followed by a Grilled Tofu Quinoa Bowl for lunch (32g Protein), and Whey Isolate Shake post-workout.`;
      } else if (query.toLowerCase().includes('protein')) {
        aiText = `Top high-protein foods tailored to your ${profile.dietPreference} diet: 1) Organic Firm Tofu (32g), 2) Paneer / Cottage Cheese (34g), 3) Whey Protein Isolate (36g), 4) Roasted Soy Chunks (42g).`;
      } else if (query.toLowerCase().includes('weight loss')) {
        aiText = `To hit your target weight of ${profile.targetWeightKg}kg, stick to your 500 kcal daily deficit (${metrics.dailyCalories} kcal/day), maintain 3.5L hydration, and utilize our 16:8 Intermittent Fasting timer.`;
      } else if (query.toLowerCase().includes('motivation')) {
        aiText = `"Consistency is what transforms average effort into extraordinary results." You have an active 7-day streak, ${profile.name}! Keep pushing towards your ${profile.targetWeightKg}kg milestone!`;
      } else {
        aiText = `I recommend prioritizing your ${metrics.proteinGrams}g protein goal, completing 45 minutes of targeted hypertrophy work, and ensuring ${profile.sleepHours} hours of sleep tonight for optimal muscle recovery.`;
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  return (
    <div className="space-y-6 pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/80 via-slate-900 to-purple-950/80 border border-slate-800 backdrop-blur-xl flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400">
          <Bot className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white">FitBot AI Health Coach</h2>
          <p className="text-xs text-slate-400">Context-Aware AI Assistant • Personalized to {profile.name}'s Profile</p>
        </div>
      </div>

      {/* Quick Query Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {quickChips.map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(chip)}
            className="px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-emerald-500/50 text-slate-300 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{chip}</span>
          </button>
        ))}
      </div>

      {/* Chat Messages Box */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl min-h-[420px] max-h-[550px] overflow-y-auto space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/40">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`p-4 rounded-2xl max-w-lg text-xs leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-emerald-500 text-slate-950 font-bold rounded-tr-none'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 font-medium rounded-tl-none'
              }`}>
                <p>{m.text}</p>
                <span className="block text-[9px] opacity-60 mt-1 text-right">{m.timestamp}</span>
              </div>
              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 font-black text-xs">
                  {profile.name[0]}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Input Form */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask FitBot AI anything about nutrition, workouts, fasting..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-3 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs font-semibold focus:outline-none focus:border-rose-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-3 rounded-2xl bg-rose-500 text-white hover:bg-rose-600 transition-colors shadow-lg shadow-rose-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
