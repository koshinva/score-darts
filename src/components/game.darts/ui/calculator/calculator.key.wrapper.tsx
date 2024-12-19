import { cn } from '@/lib/utils';

type CalculatorKeyWrapperProps = {
  span: number;
  children: React.ReactNode;
};

export const CalculatorKeyWrapper = (props: CalculatorKeyWrapperProps) => {
  const { span, children } = props;

  return (
    <div
      className={cn('border border-border dark:border-muted-foreground/10', {
        'col-span-2': span === 2,
        'col-span-3': span === 3,
        'col-span-4': span === 4,
        'col-span-6': span === 6,
      })}
    >
      {children}
    </div>
  );
};
