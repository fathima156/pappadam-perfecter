import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, Music } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize: number;
  type: 'image' | 'audio';
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept,
  maxSize,
  type,
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, curr) => {
      acc[curr.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    multiple: false,
  });

  const getIcon = () => {
    if (type === 'audio') return <Music className="w-12 h-12 text-pappadam-golden" />;
    return <File className="w-12 h-12 text-pappadam-golden" />;
  };

  return (
    <Card className="border-2 border-dashed border-pappadam-golden hover:border-pappadam-golden-dark transition-colors">
      <CardContent className="p-8">
        <div
          {...getRootProps()}
          className={`text-center cursor-pointer transition-all duration-300 ${
            isDragActive ? 'transform scale-105' : ''
          }`}
        >
          <input {...getInputProps()} />
          
          <div className="space-y-4">
            <div className="flex justify-center">
              {acceptedFiles.length > 0 ? (
                <div className="space-y-2">
                  {getIcon()}
                  <p className="text-sm font-handwritten text-pappadam-golden-dark font-bold">
                    📁 {acceptedFiles[0].name}
                  </p>
                </div>
              ) : (
                <Upload className={`w-12 h-12 transition-colors ${
                  isDragActive ? 'text-pappadam-golden-dark' : 'text-pappadam-golden'
                }`} />
              )}
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-handwritten font-bold text-pappadam-golden-dark">
                {isDragActive ? 'Drop it like it\'s hot! 🔥' : `Drop your ${type} here! ✨`}
              </p>
              <p className="text-sm font-handwritten text-cute-black">
                Or click to browse your files
              </p>
              <p className="text-xs font-handwritten text-muted-foreground">
                Max size: {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};