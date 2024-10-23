import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  imageUrl: string | undefined;
  onDrop: (acceptedFiles: File[]) => void;
  removeImage: (e: React.MouseEvent) => void;
}

export function ImageUploader({ imageUrl, onDrop, removeImage }: ImageUploaderProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/*': []},
    maxFiles: 1,
    multiple: false
  });

  return (
    <div 
      {...getRootProps()} 
      className={`
        border-2 border-dashed rounded-xl p-4 sm:p-10 text-center cursor-pointer
        transition-all duration-300 ease-in-out h-60 sm:h-80 flex items-center justify-center
        ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800'}
        ${imageUrl ? 'bg-secondary' : ''}
      `}
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="flex flex-col items-center">
          <img 
            src={imageUrl}
            alt="Selected" 
            className="max-h-40 sm:max-h-56 max-w-full mb-4 rounded-lg shadow-md"
          />
          <Button variant="outline" size="sm" onClick={removeImage}>
            <X className="mr-2 h-4 w-4" /> Remove Image
          </Button>
        </div>
      ) : isDragActive ? (
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-primary mb-4" />
          <p className="text-base sm:text-lg font-semibold">Drop the product image here ...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Upload className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-4" />
          <p className="text-base sm:text-lg font-semibold mb-2">Drag and drop a product image here</p>
          <p className="text-sm text-gray-500">or tap to select one</p>
        </div>
      )}
    </div>
  );
}
