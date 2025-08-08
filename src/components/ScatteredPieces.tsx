import React from 'react';
import pappadamPieces from '@/assets/pappadam-pieces.png';

export const ScatteredPieces: React.FC = () => {
  const pieces = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    rotation: Math.random() * 360,
    delay: Math.random() * 2,
    size: 20 + Math.random() * 30,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="pappadam-piece opacity-60"
          style={{
            left: `${piece.left}%`,
            top: `${piece.top}%`,
            '--rotation': `${piece.rotation}deg`,
            '--delay': `${piece.delay}s`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
          } as React.CSSProperties}
        >
          <img 
            src={pappadamPieces} 
            alt="" 
            className="w-full h-full object-contain opacity-80"
          />
        </div>
      ))}
    </div>
  );
};