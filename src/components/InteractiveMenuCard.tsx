import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, Wand2, Volume2, Sparkles } from 'lucide-react';
import pappadamBroken from '@/assets/pappadam-broken.png';
import pappadamWhole from '@/assets/pappadam-whole.png';

interface InteractiveMenuCardProps {
  type: 'upload' | 'missing' | 'crunch' | 'generate';
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

export const InteractiveMenuCard: React.FC<InteractiveMenuCardProps> = ({
  type,
  title,
  description,
  onClick,
  className = '',
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
      setIsClicked(false);
    }, 800);
  };

  const getIcon = () => {
    switch (type) {
      case 'upload': return <Upload className="w-6 h-6" />;
      case 'missing': return <Wand2 className="w-6 h-6" />;
      case 'crunch': return <Volume2 className="w-6 h-6" />;
      case 'generate': return <Sparkles className="w-6 h-6" />;
    }
  };

  const getPappadamImage = () => {
    if (type === 'generate') return pappadamWhole;
    return pappadamBroken;
  };

  return (
    <Card className={`bounce-hover golden-glow cursor-pointer overflow-hidden relative ${className}`}>
      <CardContent className="p-6 text-center space-y-4">
        {/* Broken pappadam pieces for upload/missing */}
        {(type === 'upload' || type === 'missing') && (
          <div className="relative">
            <div className={`transition-all duration-800 ${isClicked ? 'piece-slide-left' : ''}`}>
              <img 
                src={getPappadamImage()} 
                alt="Pappadam piece" 
                className="w-24 h-24 mx-auto mb-4 object-contain"
              />
            </div>
            {isClicked && (
              <div className="absolute inset-0 bg-white/90 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  {getIcon()}
                  <p className="text-sm font-handwritten text-pappadam-golden-dark">
                    Opening upload interface...
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Whole pappadam for generate */}
        {type === 'generate' && (
          <div className="relative">
            <img 
              src={getPappadamImage()} 
              alt="Perfect Pappadam" 
              className="w-24 h-24 mx-auto mb-4 object-contain flexing-animation"
            />
            <div className="absolute -top-2 -right-2 text-xl">💪</div>
          </div>
        )}

        {/* Audio visualization for crunch */}
        {type === 'crunch' && (
          <div className="flex justify-center items-center space-x-1 mb-4">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={i}
                className="bg-pappadam-golden rounded-full cute-loading"
                style={{
                  width: '8px',
                  height: `${20 + Math.random() * 30}px`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-xl font-bold font-handwritten text-pappadam-golden-dark">
            {title}
          </h3>
          <p className="text-sm text-cute-black font-handwritten">
            {description}
          </p>
        </div>

        <Button
          onClick={handleClick}
          className="w-full bg-pappadam-golden hover:bg-pappadam-golden-dark text-cute-black font-handwritten font-bold rounded-full transition-all duration-300"
          disabled={isClicked}
        >
          {isClicked ? 'Opening...' : 'Click me! ✨'}
        </Button>
      </CardContent>
    </Card>
  );
};