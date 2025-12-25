
import React, { useState } from 'react';
import Snowfall from './components/Snowfall';
import ChristmasTree from './components/ChristmasTree';
import GiftGenerator from './components/GiftGenerator';
import SantaChat from './components/SantaChat';
import Countdown from './components/Countdown';
import SantaClaus from './components/SantaClaus';
import { TreePine, Gift, MessageCircleHeart } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tree' | 'gifts' | 'santa'>('tree');

  return (
    <div className="min-h-screen relative selection:bg-red-500/30 overflow-x-hidden">
      <Snowfall />
      <SantaClaus />

      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-600 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-600 rounded-full blur-[100px]"></div>
      </div>

      {/* Header / Hero */}
      <header className="relative z-20 pt-16 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-holiday text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-tight">
          <span className="block md:inline">Merry</span> <span className="text-red-500 animate-blast">Christmas</span> <span className="block md:inline">2025</span>
        </h1>
        <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto font-light tracking-wide px-4">
          The magic of the North Pole is just a tap away. Explore the workshop, chat with Santa, and find the perfect gift.
        </p>
        
        <div className="mt-8">
          <Countdown />
        </div>
      </header>

      {/* Navigation */}
      <nav className="relative z-30 sticky top-6 mx-auto w-fit bg-white/10 backdrop-blur-xl border border-white/20 p-2 rounded-2xl shadow-2xl flex gap-2 my-12">
        <button
          onClick={() => setActiveTab('tree')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
            activeTab === 'tree' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'text-gray-300 hover:text-white'
          }`}
        >
          <TreePine className="w-5 h-5" />
          <span className="hidden sm:block font-medium">The Tree</span>
        </button>
        <button
          onClick={() => setActiveTab('gifts')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
            activeTab === 'gifts' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'text-gray-300 hover:text-white'
          }`}
        >
          <Gift className="w-5 h-5" />
          <span className="hidden sm:block font-medium">Workshop</span>
        </button>
        <button
          onClick={() => setActiveTab('santa')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
            activeTab === 'santa' ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'text-gray-300 hover:text-white'
          }`}
        >
          <MessageCircleHeart className="w-5 h-5" />
          <span className="hidden sm:block font-medium">Dear Santa</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-20 container mx-auto pb-32">
        {activeTab === 'tree' && (
          <div className="animate-in fade-in zoom-in duration-500">
            <ChristmasTree />
            <div className="text-center mt-10 px-6">
              <h3 className="text-3xl font-holiday text-white mb-4">Twinkling Traditions</h3>
              <p className="max-w-xl mx-auto text-gray-400 font-light leading-relaxed">
                Our magical tree is decorated with AI-infused ornaments. Each one holds a unique blessing or piece of 2025 holiday trivia. Click the star to begin your journey.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'gifts' && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <GiftGenerator />
          </div>
        )}

        {activeTab === 'santa' && (
          <div className="animate-in fade-in slide-in-from-left-4 duration-500">
            <SantaChat />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-16 px-6 border-t border-white/10 text-center text-gray-500 text-sm">
        <div className="mb-8 font-holiday text-2xl text-white/20">Merry Christmas</div>
        <p>© 2025 North Pole Digital Workshop. Powered by Magic & Gemini AI.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest font-bold">
          <span className="hover:text-red-400 cursor-pointer transition-colors">Santa Tracker</span>
          <span className="hover:text-red-400 cursor-pointer transition-colors">Privacy Sleigh</span>
          <span className="hover:text-red-400 cursor-pointer transition-colors">Cookie Policy</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
