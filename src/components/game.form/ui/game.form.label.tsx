import { FormLabel } from '@/components/ui/form';

type GameFromLabelProps = {
  label: string;
};
export const GameFormLabel = (props: GameFromLabelProps) => {
  const { label } = props;

  return <FormLabel className="font-semibold text-xl">{label}</FormLabel>;
};
