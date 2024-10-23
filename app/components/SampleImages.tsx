import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface SampleImage {
  url: string;
  name: string;
}

interface SampleImagesProps {
  sampleImages: SampleImage[];
  selectSampleImage: (url: string, name: string) => void;
}

export function SampleImages({ sampleImages, selectSampleImage }: SampleImagesProps) {
  return (
    <div>
      <Label className="text-base sm:text-lg font-semibold mb-2 block">Or try one of these sample images:</Label>
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {sampleImages.map((img, index) => (
          <div
            key={index}
            className="transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <Button
              variant="outline"
              className="p-1 h-auto"
              onClick={() => selectSampleImage(img.url, img.name)}
            >
              <img src={img.url} alt={img.name} className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
