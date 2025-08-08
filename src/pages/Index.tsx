import React, { useState } from 'react';
import { OpeningModal } from '@/components/OpeningModal';
import { ScatteredPieces } from '@/components/ScatteredPieces';
import { PappadamCharacter } from '@/components/PappadamCharacter';
import { InteractiveMenuCard } from '@/components/InteractiveMenuCard';
import { FileUpload } from '@/components/FileUpload';
import { ProcessingCard, ProcessingStatus } from '@/components/ProcessingCard';
import { CustomGeneratorForm, GenerationParams } from '@/components/CustomGeneratorForm';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import pappadamWhole from '@/assets/pappadam-whole.png';

const Index = () => {
  const [showModal, setShowModal] = useState(true);
  const [currentUploadModal, setCurrentUploadModal] = useState<'upload' | 'missing' | 'crunch' | 'generate' | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus>('idle');
  const [results, setResults] = useState<any>({});

  // Simulate API processing
  const simulateProcessing = async (duration: number = 3000) => {
    setProcessingStatus('analyzing');
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProcessingStatus('processing');
    await new Promise(resolve => setTimeout(resolve, duration));
    setProcessingStatus('complete');
  };


  const handleFileProcess = async (type: 'upload' | 'missing' | 'crunch') => {
    // Use simulated processing for all types
    if (type === 'crunch' && !audioFile) {
      toast.error('Please upload an audio file first! 🎵');
      return;
    }
    if ((type === 'missing' || type === 'upload') && !imageFile) {
      toast.error('Please upload an image first! 📸');
      return;
    }

    try {
      await simulateProcessing(type === 'crunch' ? 2000 : 4000);
      
      if (type === 'crunch') {
        setResults(prev => ({
          ...prev,
          crunch: {
            crunchRating: Math.floor(Math.random() * 4) + 7,
            analysis: {
              peakLoudness: '0.89 dB',
              crispness: '0.76 crispy',
              duration: '2.3s',
              frequency: '8.2kHz'
            }
          }
        }));
        toast.success('Crunch analysis completed! 🎉');
      } else {
        setResults(prev => ({
          ...prev,
          [type]: {
            imageUrl: pappadamWhole,
            analysis: {
              quality: 'Excellent',
              goldenness: '94%',
              puffiness: '87%',
              crispy: 'Perfect!'
            }
          }
        }));
        toast.success(`${type === 'missing' ? 'Completion' : type === 'upload' ? 'Reconstruction' : 'Processing'} successful! ✨`);
      }
    } catch (error) {
      setProcessingStatus('error');
      toast.error('Oops! Something went wrong 😅');
    }
  };

  const handleCustomGeneration = async (params: GenerationParams) => {
    try {
      await simulateProcessing(6000);
      setResults(prev => ({
        ...prev,
        custom: {
          imageUrl: pappadamWhole,
          params,
          analysis: {
            generated: 'Yes',
            quality: 'Amazing',
            matchesRequest: '98%',
            magicLevel: 'Maximum! ✨'
          }
        }
      }));
      toast.success('Your dream pappadam is ready! 🎨✨');
    } catch (error) {
      setProcessingStatus('error');
      toast.error('Failed to create your custom pappadam 😅');
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Opening Modal */}
      {showModal && <OpeningModal onClose={() => setShowModal(false)} />}
      
      {/* Scattered Pieces Background */}
      <ScatteredPieces />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold font-handwritten text-pappadam-golden-dark mb-4">
            🥞 Pappadam Planet 🌟
          </h1>
          <p className="text-xl font-handwritten text-cute-black max-w-2xl mx-auto">
            Welcome to the most magical place in the universe for crispy, golden pappadams! 
            Let's create some delicious magic together! ✨
          </p>
        </div>

        {/* Central Character */}
        <div className="flex justify-center mb-16">
          <PappadamCharacter />
        </div>

        {/* Interactive Menu Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <InteractiveMenuCard
            type="upload"
            title="Pappadam Reconstruction! ✨"
            description="Upload your broken pappadam and watch magic happen!"
            onClick={() => setCurrentUploadModal('upload')}
          />
          
          <InteractiveMenuCard
            type="missing"
            title="Find Missing Pieces! 🔍"
            description="I'll help you complete your incomplete pappadam!"
            onClick={() => setCurrentUploadModal('missing')}
          />
          
          <InteractiveMenuCard
            type="crunch"
            title="Rate My Crunch! 🔊"
            description="Upload the sound and get your crunch rating!"
            onClick={() => setCurrentUploadModal('crunch')}
          />
          
          <InteractiveMenuCard
            type="generate"
            title="Dream Pappadam Generator! 🎨"
            description="Design your perfect pappadam from scratch!"
            onClick={() => setCurrentUploadModal('generate')}
          />
        </div>

        {/* Results Display */}
        {(results.upload || results.missing || results.crunch || results.custom) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.upload && (
              <ProcessingCard
                title="Reconstruction Result"
                status="complete"
                result={results.upload}
              />
            )}
            {results.missing && (
              <ProcessingCard
                title="Completion Result"
                status="complete"
                result={results.missing}
              />
            )}
            {results.crunch && (
              <ProcessingCard
                title="Crunch Analysis"
                status="complete"
                result={results.crunch}
              />
            )}
            {results.custom && (
              <ProcessingCard
                title="Custom Generation"
                status="complete"
                result={results.custom}
              />
            )}
          </div>
        )}
      </div>

      {/* Upload/Process Modals */}
      <Dialog open={currentUploadModal !== null} onOpenChange={() => setCurrentUploadModal(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-handwritten text-2xl text-pappadam-golden-dark">
              {currentUploadModal === 'upload' && "✨ Pappadam Reconstruction!"}
              {currentUploadModal === 'missing' && "🔍 Complete Missing Pieces!"}
              {currentUploadModal === 'crunch' && "🔊 Crunch Analysis!"}
              {currentUploadModal === 'generate' && "🎨 Dream Pappadam Generator!"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {currentUploadModal === 'generate' ? (
                <CustomGeneratorForm
                  onGenerate={handleCustomGeneration}
                  isGenerating={processingStatus === 'processing'}
                />
              ) : (
                <div className="space-y-6">
                  <FileUpload
                    onFileSelect={currentUploadModal === 'crunch' ? setAudioFile : setImageFile}
                    accept={currentUploadModal === 'crunch' ? 'audio/mp3,audio/wav,audio/mpeg' : 'image/png,image/jpeg,image/jpg'}
                    maxSize={currentUploadModal === 'crunch' ? 2 * 1024 * 1024 : 5 * 1024 * 1024}
                    type={currentUploadModal === 'crunch' ? 'audio' : 'image'}
                  />
                  
                  <button
                    onClick={() => handleFileProcess(currentUploadModal as 'upload' | 'missing' | 'crunch')}
                    disabled={processingStatus === 'processing'}
                    className="w-full bg-pappadam-golden hover:bg-pappadam-golden-dark text-cute-black font-handwritten font-bold text-lg py-3 rounded-full golden-glow transition-all duration-300 disabled:opacity-50"
                  >
                    {processingStatus === 'processing' ? 'Creating Magic... ✨' : 
                     currentUploadModal === 'upload' ? 'Reconstruct Pappadam! ✨' : 
                     'Process My Pappadam! 🚀'}
                  </button>
                </div>
              )}
            </div>
            
            <ProcessingCard
              title={currentUploadModal === 'upload' ? 'Reconstruction' : 
                     currentUploadModal === 'generate' ? 'Generation' : 'Processing'}
              status={processingStatus}
              result={results[currentUploadModal || '']}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;