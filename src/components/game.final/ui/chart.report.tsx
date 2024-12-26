import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ReportPlayer } from '@/shared/types/report.type';

const chartConfig = {
  count: {
    label: 'Количество',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

type ChartReportType = {
  player: ReportPlayer;
};

export const ChartReport = (props: ChartReportType) => {
  const { player } = props;

  return (
    <div className="flex flex-col mt-4">
      <p className="text-center font-semibold">Очки за ход в диапазоне</p>
      <ChartContainer config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={player.chart}
          layout="vertical"
          margin={{
            left: -20,
          }}
        >
          <XAxis type="number" dataKey="count" hide />
          <YAxis dataKey="diapason" type="category" tickLine={false} axisLine={false} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="count" fill="hsl(var(--chart-5))" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
