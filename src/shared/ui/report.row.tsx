type ReportRowProps = {
  label: string;
  value: string | number;
};

export const ReportRow = (props: ReportRowProps) => {
  const { label, value } = props;

  return (
    <div className="flex items-end gap-1 text-sm">
      <p className="leading-none">{label}</p>
      <div className="border-b border-dashed border-border flex-1" />
      <p className="leading-none">{value}</p>
    </div>
  );
};
