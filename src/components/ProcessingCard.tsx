import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type ProcessingStatus = 'idle' | 'analyzing' | 'processing' | 'complete' | 'error';

interface ProcessingCardProps {
  title: string;
  status: ProcessingStatus;
  result?: any;
  className?: string;
}

export const ProcessingCard: React.FC<ProcessingCardProps> = ({
  title,
  status,
  result,
  className = '',
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'analyzing':
      case 'processing':
        return <Loader2 className="w-5 h-5 animate-spin text-pappadam-golden" />;
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'analyzing': return 'Analyzing your pappadam... 🔍';
      case 'processing': return 'Creating crispy magic... ✨';
      case 'complete': return 'Tada! All done! 🎉';
      case 'error': return 'Oops! Something went wrong 😅';
      default: return 'Ready to process! 🚀';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'analyzing': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-pappadam-golden-light text-pappadam-golden-dark';
      case 'complete': return 'bg-green-100 text-green-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between font-handwritten text-pappadam-golden-dark">
          {title}
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Badge className={`${getStatusColor()} font-handwritten`}>
          {getStatusText()}
        </Badge>

        {status === 'processing' && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-pappadam-golden h-2 rounded-full animate-pulse w-3/4"></div>
            </div>
            <p className="text-sm font-handwritten text-cute-black">
              Making your pappadam perfect... 
            </p>
          </div>
        )}

        {result && status === 'complete' && (
          <div className="space-y-4">
            {result.imageUrl && (
              <img 
                src={result.imageUrl} 
                alt="Result" 
                className="w-full h-48 object-cover rounded-lg shadow-lg golden-glow"
              />
            )}
            
            {result.analysis && (
              <div className="space-y-2">
                <h4 className="font-bold font-handwritten text-pappadam-golden-dark">
                  Analysis Results:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(result.analysis).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-handwritten capitalize text-cute-black">
                        {key.replace(/([A-Z])/g, ' $1')}:
                      </span>
                      <span className="font-handwritten font-bold text-pappadam-golden-dark">
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {result.crunchRating && (
              <div className="text-center space-y-2">
                <h4 className="font-bold font-handwritten text-pappadam-golden-dark">
                  Crunch Rating:
                </h4>
                <div className="text-4xl font-bold text-pappadam-golden">
                  {result.crunchRating}/10
                </div>
                <div className="flex justify-center space-x-1">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < result.crunchRating ? 'bg-pappadam-golden' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};