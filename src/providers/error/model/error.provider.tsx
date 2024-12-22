import { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from '../ui/fallback.ui';
import { useGameDartsStore } from '@/shared/store/game.darts.store';

const logError = (error: Error, { componentStack }: React.ErrorInfo) => {
  console.error(error, componentStack);
};

export const ErrorBoundaryProvider = (props: PropsWithChildren) => {
  const { children } = props;
  const reset = useGameDartsStore((state) => state.reset);

  return (
    <ErrorBoundary
      fallbackRender={Fallback}
      onError={logError}
      onReset={() => {
        reset();
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
