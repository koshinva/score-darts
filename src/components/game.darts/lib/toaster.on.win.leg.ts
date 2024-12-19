import { toast } from 'sonner';

export const toasterOnWinLeg = (message: string) => {
  toast('Партия закончена', {
    description: message,
    id: 'win-leg',
    position: 'top-left',
    duration: 3000,
    icon: '🎉',
  });
};
