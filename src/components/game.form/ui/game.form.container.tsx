type GameFormContainerProps = {
  children: React.ReactNode;
};

export const GameFormContainer = (props: GameFormContainerProps) => {
  const { children } = props;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[min(90wh,800px)]">{children}</div>
    </div>
  );
};
