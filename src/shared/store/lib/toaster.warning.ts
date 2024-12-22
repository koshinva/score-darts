import { toast } from 'sonner';

export const toasterWarning = (message: string) => {
  toast.warning('Недопустимое действие', {
    description: message,
    id: 'warning',
    position: 'top-left',
    duration: 3000,
  });
};
