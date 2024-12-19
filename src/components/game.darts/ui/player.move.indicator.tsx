import { cn } from '@/lib/utils';

type PlayerMoveIndicatorProps = {
  type?: 'active';
};

export const PlayerMoveIndicator = (props: PlayerMoveIndicatorProps) => {
  const { type } = props;

  return (
    <span className="absolute flex size-3">
      <span
        className={cn('absolute inline-flex h-full w-full rounded-full bg-gray-500 opacity-75', {
          'bg-green-500 animate-ping': type === 'active',
        })}
      />
      <span
        className={cn('relative inline-flex rounded-full h-3 w-3 bg-gray-500', {
          'bg-green-500': type === 'active',
        })}
      />
    </span>
  );
};
