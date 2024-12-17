import { Button } from '@/components/ui/button';

export const OkButton = () => {
  return (
    <Button
      className="w-full h-full bg-success rounded-none [&_svg]:size-6 text-success-foreground hover:text-background text-lg"
      onClick={() => console.log('ok')}
    >
      Ok
    </Button>
  );
};
