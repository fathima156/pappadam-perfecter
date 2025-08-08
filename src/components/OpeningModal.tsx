import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import pappadamCharacter from '@/assets/pappadam-character.png';

interface OpeningModalProps {
  onClose: () => void;
}

export const OpeningModal: React.FC<OpeningModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
      setTimeout(onClose, 500); // Wait for fade animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="border-none bg-white shadow-2xl rounded-3xl p-8 max-w-md mx-auto">
        <div className="text-center space-y-6">
          <div className="relative">
            <img 
              src={pappadamCharacter} 
              alt="Cute Pappadam" 
              className="w-32 h-32 mx-auto animate-bounce"
            />
            <div className="absolute -top-2 -right-2 text-2xl animate-pulse">✨</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">🌟</div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-pappadam-golden-dark font-handwritten">
              Welcome to
            </h2>
            <h1 className="text-4xl font-bold text-pappadam-golden font-handwritten">
              Pappadam Planet! 🥞
            </h1>
          </div>
          
          <p className="text-lg text-cute-black font-handwritten">
            Let's create some crispy magic together! ✨
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};