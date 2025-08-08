import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Key, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

interface GeminiApiKeyFormProps {
  onApiKeySet: (apiKey: string) => void;
}

export const GeminiApiKeyForm: React.FC<GeminiApiKeyFormProps> = ({ onApiKeySet }) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isStored, setIsStored] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setIsStored(true);
      onApiKeySet(storedKey);
    }
  }, [onApiKeySet]);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      toast.error('Gemini API keys usually start with "AIza"');
      return;
    }

    localStorage.setItem('gemini_api_key', apiKey);
    setIsStored(true);
    onApiKeySet(apiKey);
    toast.success('API key saved successfully! 🔑');
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsStored(false);
    toast.success('API key cleared');
  };

  return (
    <Card className="border-2 border-pappadam-golden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-handwritten text-pappadam-golden-dark">
          <Key className="w-5 h-5" />
          Gemini API Key Required 🤖
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label className="font-handwritten text-cute-black">
            Enter your Google Gemini API Key:
          </Label>
          <div className="relative">
            <Input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              className="pr-10 font-mono"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => setShowKey(!showKey)}
            >
              {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSaveKey}
            disabled={isStored}
            className="flex-1 bg-pappadam-golden hover:bg-pappadam-golden-dark text-cute-black font-handwritten"
          >
            {isStored ? 'Key Saved ✓' : 'Save Key 🔑'}
          </Button>
          {isStored && (
            <Button
              onClick={handleClearKey}
              variant="outline"
              className="font-handwritten"
            >
              Clear
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground font-handwritten space-y-1">
          <p>• Get your free API key from Google AI Studio</p>
          <p>• Your key is stored locally in your browser</p>
          <p>• For production apps, consider using Supabase for secure storage</p>
        </div>
      </CardContent>
    </Card>
  );
};