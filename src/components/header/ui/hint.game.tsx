import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  BombIcon,
  KeyboardIcon,
  LightbulbIcon,
  RadicalIcon,
  SendHorizonalIcon,
  UndoIcon,
  XIcon,
} from 'lucide-react';
import React from 'react';

const hints = [
  { icon: XIcon, description: 'Очистить текущий ход', className: 'bg-warning' },
  {
    icon: BombIcon,
    description: 'Перебор в текущий ход',
    className: 'bg-warning',
  },
  {
    icon: UndoIcon,
    description: 'Отменить последний ход',
    className: 'bg-destructive',
  },
  {
    icon: SendHorizonalIcon,
    description: 'Отправить результат',
    className: 'bg-success',
  },
  {
    icon: RadicalIcon,
    description: 'Переключить режим калькулятора',
    className: '',
  },
  {
    icon: KeyboardIcon,
    description: 'Горячие клавиши (в разработке)',
    className: 'opacity-30',
  },
];

export const HintGame = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon">
            <LightbulbIcon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col gap-2">
                {hints.map(({ icon: Icon, description, className }, index) => (
                  <React.Fragment key={index}>
                    <div className="flex items-center gap-2 text-sm">
                      <div
                        className={cn('flex items-center justify-center p-1 rounded-sm', className)}
                      >
                        <Icon className="stroke-primary" />
                      </div>
                      <p>{description}</p>
                    </div>
                    {index !== hints.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
