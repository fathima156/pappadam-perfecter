import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles } from 'lucide-react';

export interface GenerationParams {
  puffiness: number;
  crunchiness: number;
  goldenness: number;
  customDescription: string;
}

interface CustomGeneratorFormProps {
  onGenerate: (params: GenerationParams) => void;
  isGenerating: boolean;
}

export const CustomGeneratorForm: React.FC<CustomGeneratorFormProps> = ({
  onGenerate,
  isGenerating,
}) => {
  const [params, setParams] = useState<GenerationParams>({
    puffiness: 70,
    crunchiness: 80,
    goldenness: 85,
    customDescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(params);
  };

  return (
    <Card className="space-y-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-handwritten text-pappadam-golden-dark">
          <Sparkles className="w-5 h-5" />
          Design Your Perfect Pappadam! ✨
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Puffiness Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="font-handwritten text-cute-black font-bold">
                Puffiness Level 🎈
              </Label>
              <span className="text-pappadam-golden font-handwritten font-bold">
                {params.puffiness}%
              </span>
            </div>
            <Slider
              value={[params.puffiness]}
              onValueChange={(value) => setParams(prev => ({ ...prev, puffiness: value[0] }))}
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
            <p className="text-xs font-handwritten text-muted-foreground">
              How puffy do you want your pappadam? 
            </p>
          </div>

          {/* Crunchiness Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="font-handwritten text-cute-black font-bold">
                Crunchiness Factor 🔊
              </Label>
              <span className="text-pappadam-golden font-handwritten font-bold">
                {params.crunchiness}%
              </span>
            </div>
            <Slider
              value={[params.crunchiness]}
              onValueChange={(value) => setParams(prev => ({ ...prev, crunchiness: value[0] }))}
              max={100}
              min={20}
              step={5}
              className="w-full"
            />
            <p className="text-xs font-handwritten text-muted-foreground">
              How crispy should it sound when you bite it?
            </p>
          </div>

          {/* Goldenness Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <Label className="font-handwritten text-cute-black font-bold">
                Golden Color ✨
              </Label>
              <span className="text-pappadam-golden font-handwritten font-bold">
                {params.goldenness}%
              </span>
            </div>
            <Slider
              value={[params.goldenness]}
              onValueChange={(value) => setParams(prev => ({ ...prev, goldenness: value[0] }))}
              max={100}
              min={30}
              step={5}
              className="w-full"
            />
            <p className="text-xs font-handwritten text-muted-foreground">
              How golden and beautiful should it look?
            </p>
          </div>

          {/* Custom Description */}
          <div className="space-y-3">
            <Label className="font-handwritten text-cute-black font-bold">
              Special Requests 💭
            </Label>
            <Textarea
              placeholder="Tell me anything special you want! Like extra crispy edges, specific shape, or magical sparkles... ✨"
              value={params.customDescription}
              onChange={(e) => setParams(prev => ({ ...prev, customDescription: e.target.value }))}
              className="font-handwritten"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full bg-pappadam-golden hover:bg-pappadam-golden-dark text-cute-black font-handwritten font-bold text-lg py-3 rounded-full golden-glow"
          >
            {isGenerating ? (
              <>
                <div className="cute-loading mr-2">🪄</div>
                Creating magic...
              </>
            ) : (
              <>
                Generate My Dream Pappadam! 🎨✨
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};