import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type PlayerBadgeDetailProps = {
  title: string;
  value: string | number;
  className?: string;
};

export const PlayerBadgeDetail = (props: PlayerBadgeDetailProps) => {
  const { title, value, className } = props;

  return (
    <Badge
      variant="secondary"
      className={cn(
        'text-xs rounded-md font-normal justify-between max-md:flex-col max-md:gap-0',
        className,
      )}
    >
      <span className="mr-1 opacity-80">{title}:</span>
      <span className="font-semibold">{value}</span>
    </Badge>
  );
};
