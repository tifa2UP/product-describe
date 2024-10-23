import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export function Header() {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-primary inline-flex items-center mb-2">
        <ShoppingBag className="mr-2 h-8 w-8 sm:h-10 sm:w-10 hidden sm:inline-block" />
        Product Descriptions AI
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-2">
        Generate SEO-optimized product titles and descriptions for your e-commerce store
      </p>
      <div className="flex justify-center mt-4 mb-10">
        <Button
          onClick={() => console.log('Connect to Shopify')}
          className="bg-[#96bf48] hover:bg-[#7aa93c] text-white font-bold py-2 px-4 rounded"
        >
          Connect to Shopify
        </Button>
        
      </div>
    </div>
  );
}
