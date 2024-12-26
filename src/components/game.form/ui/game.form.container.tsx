type GameFormContainerProps = {
  children: React.ReactNode;
};

export const GameFormContainer = (props: GameFormContainerProps) => {
  const { children } = props;

  return (
    <div className="w-full h-full flex items-center justify-center bg-background">
      <div className="w-[min(90vw,800px)] border border-muted rounded-md p-4 shadow-sm bg-background">
        {children}
      </div>
    </div>
  );
};
