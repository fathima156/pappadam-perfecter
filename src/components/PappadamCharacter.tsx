import React, { useState, useEffect } from 'react';
import pappadamCharacter from '@/assets/pappadam-character.png';

export const PappadamCharacter: React.FC = () => {
  const [currentAnimation, setCurrentAnimation] = useState<'running' | 'flexing' | 'smirking'>('running');

  useEffect(() => {
    const animations: ('running' | 'flexing' | 'smirking')[] = ['running', 'flexing', 'smirking'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % animations.length;
      setCurrentAnimation(animations[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center space-y-4 relative">
      <div className="relative">
        <img 
          src={pappadamCharacter} 
          alt="Pappadam Character" 
          className={`w-48 h-48 pappadam-character ${currentAnimation}-animation transition-all duration-500`}
        />
        
        {/* Cute sparkles around character */}
        <div className="absolute -top-4 -left-4 text-2xl animate-ping">⭐</div>
        <div className="absolute -top-4 -right-4 text-xl animate-pulse">✨</div>
        <div className="absolute -bottom-4 -left-4 text-xl animate-bounce">🌟</div>
        <div className="absolute -bottom-4 -right-4 text-2xl animate-pulse">💫</div>
      </div>
      
      <div className="text-center">
        <h2 className="text-2xl font-bold text-pappadam-golden font-handwritten">
          {currentAnimation === 'running' && "I'm running to help you! 🏃‍♂️"}
          {currentAnimation === 'flexing' && "Look at my crispy strength! 💪"}
          {currentAnimation === 'smirking' && "Ready for some fun? 😏✨"}
        </h2>
      </div>
    </div>
  );
};