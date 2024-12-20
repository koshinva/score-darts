import { Button } from '@/components/ui/button';
import { FallbackProps } from 'react-error-boundary';

export const Fallback = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;

  return (
    <div
      role="alert"
      className="w-[min(90vw,800px)] h-full flex flex-col justify-center mx-auto gap-2"
    >
      <p className="text-2xl text-center">Что-то пошло не так</p>
      <Button variant="destructive" onClick={resetErrorBoundary}>
        Попробовать снова
      </Button>
      <p>
        <strong className="text-destructive text-xl">Детали: </strong>
        <span className="text-muted-foreground text-base">{error.message}</span>
      </p>
    </div>
  );
};
