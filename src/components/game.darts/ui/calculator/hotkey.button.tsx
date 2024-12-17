import { Button } from '@/components/ui/button';
import { KeyboardIcon } from 'lucide-react';

export const HotKeyButton = () => {
  return (
    <Button
      disabled
      className="w-full h-full bg-accent rounded-none [&_svg]:size-6 text-accent-foreground hover:text-background"
      onClick={() => console.log('hotkey')}
    >
      <KeyboardIcon />
    </Button>
  );
};
