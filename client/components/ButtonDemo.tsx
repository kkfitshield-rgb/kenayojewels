import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ButtonDemo() {
  return (
    <div className="flex gap-4 bg-white text-left">
      <Button 
        variant="white" 
        asChild
      >
        <Link to="/catalog">View Catalog</Link>
      </Button>
      
      <Button 
        variant="white-outline" 
        asChild
      >
        <Link to="/contact">Request Quote</Link>
      </Button>
    </div>
  );
}
