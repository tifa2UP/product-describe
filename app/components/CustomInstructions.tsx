import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CustomInstructionsProps {
  customInstructions: string;
  setCustomInstructions: (value: string) => void;
}

export function CustomInstructions({ customInstructions, setCustomInstructions }: CustomInstructionsProps) {
  return (
    <div className="space-y-2 mt-8 sm:mt-16">
      <Label htmlFor="prompt" className="text-base sm:text-lg font-semibold">Custom instructions (optional)</Label>
      <Input 
        id="prompt" 
        name="prompt" 
        placeholder="e.g. &quot;Make the description include a Key Features section&quot;" 
        className="w-full"
        value={customInstructions}
        onChange={(e) => setCustomInstructions(e.target.value)}
      />
    </div>
  );
}
