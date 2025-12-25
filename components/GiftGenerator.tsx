
import React, { useState } from 'react';
import { Gift, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { getGiftIdeas } from '../services/geminiService';
import { GiftSuggestion } from '../types';

const GiftGenerator: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [interests, setInterests] = useState('');
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !interests) return;
    setLoading(true);
    try {
      const ideas = await getGiftIdeas(recipient, interests);
      setSuggestions(ideas);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-holiday text-red-500 mb-2">Santa's Workshop</h2>
        <p className="text-gray-300">Describe who you're shopping for, and our AI Elves will find the perfect 2025 gift.</p>
      </div>

      <form onSubmit={handleGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm font-medium">Who is it for?</label>
          <input
            type="text"
            placeholder="e.g. My tech-savvy cousin"
            className="bg-white/5 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-1">
          <label className="text-white text-sm font-medium">What do they love?</label>
          <input
            type="text"
            placeholder="e.g. Hiking, retro games, coffee"
            className="bg-white/5 border border-white/20 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Gift />}
            Generate Gifts
          </button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {suggestions.map((gift, idx) => (
            <div key={idx} className="bg-gradient-to-br from-green-900/40 to-green-800/20 backdrop-blur-sm border border-green-700/30 p-6 rounded-2xl shadow-xl hover:shadow-green-900/20 transition-all">
              <div className="bg-red-500/20 p-2 rounded-lg w-fit mb-4">
                <Sparkles className="text-red-400 w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{gift.name}</h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">{gift.description}</p>
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Why it's perfect:</span>
                <p className="text-xs text-gray-400 mt-1">{gift.reason}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GiftGenerator;
