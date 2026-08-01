import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, ExternalLink, ShieldCheck, Truck, Zap } from 'lucide-react';
import type { FoodItem } from '../../types';

interface Props {
  food: FoodItem;
  onClose: () => void;
}

export const EcommerceBuyModal: React.FC<Props> = ({ food, onClose }) => {
  const stores = [
    { name: 'Blinkit', desc: '10 Minute Instant Grocery Delivery', color: 'from-amber-400 to-yellow-500', link: food.storeLinks.blinkit || 'https://blinkit.com' },
    { name: 'Zepto', desc: '10 Minute Fresh Produce', color: 'from-purple-500 to-indigo-600', link: food.storeLinks.zepto || 'https://zeptonow.com' },
    { name: 'Instamart', desc: 'Swiggy Quick Grocery', color: 'from-orange-500 to-amber-500', link: food.storeLinks.instamart || 'https://swiggy.com/instamart' },
    { name: 'BigBasket', desc: 'Organic & Bulk Grocery Mart', color: 'from-emerald-500 to-green-600', link: food.storeLinks.bigbasket || 'https://bigbasket.com' },
    { name: 'Amazon Fresh', desc: 'Prime Scheduled Delivery', color: 'from-cyan-500 to-blue-600', link: food.storeLinks.amazon || 'https://amazon.com' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                Buy Ingredients Direct
              </h3>
              <p className="text-xs text-slate-400">
                10-Minute Express Grocery Checkout
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product summary card */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800">
            <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-white">{food.name}</h4>
              <span className="text-xs font-black text-emerald-400">${food.priceEstimate.toFixed(2)} est. kit</span>
              <p className="text-[10px] text-slate-400">Includes all {food.ingredients.length} required ingredients</p>
            </div>
          </div>

          {/* Quick Stores links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Choose Express Partner Store
            </h4>

            {stores.map((s, idx) => (
              <a
                key={idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${s.color} text-slate-950 font-black flex items-center justify-center text-xs shadow-md`}>
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">{s.name}</h5>
                    <span className="text-[10px] text-slate-400 font-medium">{s.desc}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-extrabold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                  <span>Order</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
};
