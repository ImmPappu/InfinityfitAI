import React from 'react';
import { motion } from 'framer-motion';
import { X, ShoppingBag, ExternalLink } from 'lucide-react';
import type { FoodItem } from '../../types';

interface Props {
  food: FoodItem;
  onClose: () => void;
}

export const EcommerceBuyModal: React.FC<Props> = ({ food, onClose }) => {
  const stores = [
    { name: 'Blinkit', desc: '10 Minute Instant Grocery Delivery', color: 'bg-[#F97316] text-white', link: food.storeLinks.blinkit || 'https://blinkit.com' },
    { name: 'Zepto', desc: '10 Minute Fresh Produce', color: 'bg-purple-600 text-white', link: food.storeLinks.zepto || 'https://zeptonow.com' },
    { name: 'Instamart', desc: 'Swiggy Quick Grocery', color: 'bg-orange-500 text-white', link: food.storeLinks.instamart || 'https://swiggy.com/instamart' },
    { name: 'BigBasket', desc: 'Organic & Bulk Grocery Mart', color: 'bg-[#06B6D4] text-white', link: food.storeLinks.bigbasket || 'https://bigbasket.com' },
    { name: 'Amazon Fresh', desc: 'Prime Scheduled Delivery', color: 'bg-[#22C55E] text-white', link: food.storeLinks.amazon || 'https://amazon.com' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-white border border-[#E5E7EB] rounded-2xl shadow-xl overflow-hidden my-8 text-left text-[#111827]"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-[#F8FAFC] border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#22C55E]/10 text-[#22C55E]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#111827]">
                Buy Ingredients Direct
              </h3>
              <p className="text-xs text-[#6B7280]">
                10-Minute Express Grocery Checkout
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-[#6B7280] hover:text-[#111827] hover:bg-[#E5E7EB] rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product summary card */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB]">
            <img src={food.image} alt={food.name} className="w-16 h-16 rounded-xl object-cover" />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-[#111827]">{food.name}</h4>
              <span className="text-xs font-black text-[#22C55E]">₹{(food as any).estimatedPriceRs || 180} est. kit</span>
              <p className="text-[10px] text-[#6B7280]">Includes all {food.ingredients.length} required ingredients</p>
            </div>
          </div>

          {/* Quick Stores links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280]">
              Choose Partner Store
            </h4>

            {stores.map((s, idx) => (
              <a
                key={idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#22C55E]/40 hover:bg-[#F8FAFC] transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${s.color} font-black flex items-center justify-center text-xs shadow-xs`}>
                    {s.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-[#111827] group-hover:text-[#22C55E] transition-colors">{s.name}</h5>
                    <span className="text-[10px] text-[#6B7280] font-medium">{s.desc}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#22C55E]/10 text-[#22C55E] text-xs font-extrabold group-hover:bg-[#22C55E] group-hover:text-white transition-all">
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
