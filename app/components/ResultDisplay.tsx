import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2, RefreshCw, ArrowLeft, Copy } from 'lucide-react';
import { useState } from 'react';

interface ResultDisplayProps {
  imageUrl: string | undefined;
  customInstructions: string;
  result: { title: string; description: string } | null;
  isLoading: boolean;
  regenerateDescription: () => void;
  resetForm: () => void;
}

export function ResultDisplay({ 
  imageUrl, 
  customInstructions, 
  result, 
  isLoading, 
  regenerateDescription, 
  resetForm 
}: ResultDisplayProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-6 bg-secondary dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-center">
        {imageUrl && (
          <img 
            src={imageUrl}
            alt="Product" 
            className="max-h-64 max-w-full rounded-lg shadow-md"
          />
        )}
      </div>
      {customInstructions && (
        <div>
          <Label className="text-base sm:text-lg font-semibold">Custom Instructions:</Label>
          <p className="text-gray-600 dark:text-gray-300">{customInstructions}</p>
        </div>
      )}
      {result && (
        <>
          <div className="p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xl sm:text-2xl font-bold">Title:</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(result.title, 'title')}
              >
                {copiedField === 'title' ? 'Copied!' : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-lg sm:text-xl text-primary">{result.title}</p>
          </div>
          <div className="p-4 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <Label className="text-xl sm:text-2xl font-bold">Description:</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(result.description, 'description')}
              >
                {copiedField === 'description' ? 'Copied!' : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">{result.description}</p>
          </div>
        </>
      )}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={regenerateDescription} 
          className="w-full sm:w-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
              Regenerating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Regenerate
            </>
          )}
        </Button>
        <Button 
          onClick={resetForm}
          variant="outline" 
          className="w-full sm:w-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Upload Another Image
        </Button>
      </div>
    </div>
  );
}
