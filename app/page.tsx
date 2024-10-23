"use client"

import { useState, useCallback } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { SampleImages } from './components/SampleImages';
import { CustomInstructions } from './components/CustomInstructions';
import { GenerateButton } from './components/GenerateButton';
import { ResultDisplay } from './components/ResultDisplay';

const sampleImages = [
  {
    url: "https://woodlandpulse.com/cdn/shop/files/Unique-Planters-Unique-Planter-Unique-Flower-Pots-Unique-Flower-Pot-Unique-Planters-Unique-Planter-Unique-Plant-Pot-Unique-Plant-Pots.jpg?v=1727667696&width=1280",
    name: "Unique Planter"
  },
  {
    url: "https://woodlandpulse.com/cdn/shop/products/Wooden-Succulent-Planter-Cream-Planter-Cream-Pots-Wood-Flower-Pot-Beige-Planter-Beige-Plant-Pot-Neutral-Planters-Plant-Pots-Neutral-826484.jpg?v=1691341993&width=1280",
    name: "Wooden Succulent Planter"
  },
  {
    url: "https://woodlandpulse.com/cdn/shop/files/Pots-for-planting-succulents-square-planter-square-succulent-pot-unique-planters-cute-plant-pots-cute-planters-unique-flower-pots.jpg?v=1691342500&width=1280",
    name: "Square Succulent Planter"
  }
];

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [result, setResult] = useState<{ title: string; description: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customInstructions, setCustomInstructions] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setImage(file);
      setImageUrl(URL.createObjectURL(file));
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImageBase64(event.target.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await generateDescription();
  };

  const generateDescription = async () => {
    if (!imageBase64) {
      setError('Please upload an image or select a sample image before generating a description.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64,
          additionalDetails: customInstructions,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate description');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('An error occurred while generating the description. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImage(null);
    setImageUrl(undefined);
    setImageBase64(null);
  };

  const selectSampleImage = async (url: string, name: string) => {
    setImageUrl(url);
    setImage(null);
    
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setImageBase64(event.target.result.split(',')[1]);
        }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error loading sample image:', error);
      setError('Failed to load sample image. Please try again or upload your own image.');
    }
  };

  const regenerateDescription = () => {
    generateDescription();
  };

  const resetForm = () => {
    setImage(null);
    setImageUrl(undefined);
    setImageBase64(null);
    setCustomInstructions('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <Header />
        
        <div className="space-y-6">
          {!result ? (
            <>
              <ImageUploader imageUrl={imageUrl} onDrop={onDrop} removeImage={removeImage} />
              
              <div className="space-y-4">
                <SampleImages sampleImages={sampleImages} selectSampleImage={selectSampleImage} />
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <CustomInstructions 
                    customInstructions={customInstructions}
                    setCustomInstructions={setCustomInstructions}
                  />
                  <GenerateButton isLoading={isLoading} />
                </form>
              </div>
            </>
          ) : (
            <ResultDisplay 
              imageUrl={imageUrl}
              customInstructions={customInstructions}
              result={result}
              isLoading={isLoading}
              regenerateDescription={regenerateDescription}
              resetForm={resetForm}
            />
          )}
          
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
