import { Button } from '@/components/ui/button';

export const BustButton = () => {
  return (
    <Button
      className="w-full h-full bg-warning rounded-none [&_svg]:size-6 text-warning-foreground hover:text-background text-lg"
      onClick={() => console.log('bust')}
    >
      Перебор
    </Button>
  );
};
