import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface GenerateButtonProps {
  isLoading: boolean;
}

export function GenerateButton({ isLoading }: GenerateButtonProps) {
  return (
    <Button type="submit" className="w-full h-10 sm:h-12 text-base sm:text-lg font-semibold">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          Generating...
        </>
      ) : 'Generate Description'}
    </Button>
  );
}
