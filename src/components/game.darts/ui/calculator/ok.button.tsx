import { Button } from '@/components/ui/button';

export const OkButton = () => {
  return (
    <Button
      className="w-full h-full bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background text-lg"
      onClick={() => console.log('ok')}
    >
      Ok
    </Button>
  );
};
