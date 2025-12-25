
import React, { useState } from 'react';
import { Star, Sparkles } from 'lucide-react';
import { getHolidayWisdom } from '../services/geminiService';

const ChristmasTree: React.FC = () => {
  const [wisdom, setWisdom] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOrnamentClick = async () => {
    setLoading(true);
    try {
      const text = await getHolidayWisdom();
      setWisdom(text);
    } catch (err) {
      setWisdom("Merry Christmas 2025!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4">
      <div className="relative group cursor-pointer" onClick={handleOrnamentClick}>
        {/* The Star */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 animate-pulse">
          <Star className="w-16 h-16 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" />
        </div>

        {/* Tree Body */}
        <div className="flex flex-col items-center">
          {/* Layer 1 */}
          <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-bottom-[80px] border-b-green-700 rounded-lg shadow-xl translate-y-2"></div>
          {/* Layer 2 */}
          <div className="w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-bottom-[120px] border-b-green-800 rounded-lg shadow-xl -translate-y-4"></div>
          {/* Layer 3 */}
          <div className="w-0 h-0 border-l-[140px] border-l-transparent border-r-[140px] border-r-transparent border-bottom-[160px] border-b-green-900 rounded-lg shadow-xl -translate-y-12"></div>
          {/* Trunk */}
          <div className="w-16 h-20 bg-amber-900 rounded-b-md shadow-inner -translate-y-12"></div>
        </div>

        {/* Ornaments */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div className="relative w-full h-full">
             <div className="absolute top-20 left-1/2 -translate-x-10 w-4 h-4 rounded-full bg-red-500 shadow-lg animate-bounce"></div>
             <div className="absolute top-32 left-1/2 translate-x-8 w-5 h-5 rounded-full bg-blue-400 shadow-lg animate-pulse"></div>
             <div className="absolute top-48 left-1/2 -translate-x-16 w-4 h-4 rounded-full bg-yellow-300 shadow-lg"></div>
             <div className="absolute top-56 left-1/2 translate-x-12 w-6 h-6 rounded-full bg-purple-500 shadow-lg animate-bounce" style={{animationDelay: '1s'}}></div>
             <div className="absolute top-64 left-1/2 -translate-x-4 w-5 h-5 rounded-full bg-red-600 shadow-lg animate-pulse"></div>
             <div className="absolute top-24 left-1/2 translate-x-4 w-3 h-3 rounded-full bg-white shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Interactive Tooltip/Wisdom Display */}
      <div className={`mt-8 max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 transition-all duration-500 transform ${wisdom ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex items-start gap-4 text-white">
          <Sparkles className="w-6 h-6 text-yellow-400 shrink-0" />
          <p className="text-lg italic leading-relaxed">
            {loading ? "Glistening the tinsel..." : wisdom}
          </p>
        </div>
        <button 
          onClick={() => setWisdom(null)}
          className="mt-4 text-sm text-white/60 hover:text-white underline underline-offset-4"
        >
          Close
        </button>
      </div>

      <p className="text-white/60 mt-4 text-center font-light">
        Tip: Click the star or ornaments for a Christmas blessing!
      </p>
    </div>
  );
};

export default ChristmasTree;
