
import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { chatWithSanta } from '../services/geminiService';
import { ChatMessage } from '../types';

const SantaChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'santa', text: "Ho ho ho! Merry Christmas! Have you been good this year?", timestamp: new Date() }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Convert current messages to Gemini history format
      const history = messages.map(msg => ({
        role: msg.role === 'santa' ? 'model' as const : 'user' as const,
        parts: [{ text: msg.text }]
      }));

      const response = await chatWithSanta(input, history);
      const santaMsg: ChatMessage = { role: 'santa', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, santaMsg]);
    } catch (err) {
      console.error("Santa is busy:", err);
      setMessages(prev => [...prev, { role: 'santa', text: "Ho ho ho! The North Pole signal is weak, try again!", timestamp: new Date() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col h-[600px] border-b-8 border-red-600/50">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-3xl shadow-lg border-2 border-red-500">
              🎅
            </div>
            <div>
              <h3 className="text-white font-bold text-xl font-holiday tracking-wider">Dear Santa</h3>
              <span className="text-white/80 text-xs flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                Live from the North Pole
              </span>
            </div>
          </div>
          <Sparkles className="text-yellow-400 w-6 h-6 animate-pulse" />
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-[url('https://www.transparenttextures.com/patterns/snow.png')]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'santa' ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] p-4 rounded-3xl shadow-md ${
                msg.role === 'santa' 
                ? 'bg-white/20 text-white rounded-tl-none border border-white/20 backdrop-blur-md' 
                : 'bg-red-600 text-white rounded-tr-none'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <span className="text-[10px] opacity-60 mt-2 block text-right">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/20 p-5 rounded-3xl rounded-tl-none border border-white/20 backdrop-blur-md flex gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-6 bg-black/40 border-t border-white/10 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tell Santa your Christmas wishes..."
            className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-5 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition-all placeholder:text-white/30"
          />
          <button 
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-2xl transition-all disabled:opacity-50 shadow-lg active:scale-95 flex items-center justify-center min-w-[50px]"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
      <p className="text-center text-white/40 text-[10px] mt-4 uppercase tracking-[0.2em]">Magical AI Encrypted Connection</p>
    </div>
  );
};

export default SantaChat;
