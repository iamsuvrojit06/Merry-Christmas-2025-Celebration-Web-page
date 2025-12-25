
import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ days: number, hours: number, minutes: number, seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('December 25, 2025 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return (
    <div className="text-center py-10">
      <h2 className="text-6xl font-holiday text-red-500 animate-pulse">Merry Christmas 2025!</h2>
    </div>
  );

  return (
    <div className="flex justify-center gap-4 md:gap-8 py-10">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 border border-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-bold text-white shadow-lg">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-xs md:text-sm text-gray-400 mt-2 uppercase tracking-widest">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;
