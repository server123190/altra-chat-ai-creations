const TypingIndicator = () => {
  return (
    <div className="flex gap-1 p-4 bg-card rounded-2xl rounded-bl-sm border border-border max-w-[85%] animate-fade-in shadow-sm">
      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-[typing_1s_ease-in-out_infinite]" />
      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-[typing_1s_ease-in-out_0.2s_infinite]" />
      <div className="w-2 h-2 bg-foreground/40 rounded-full animate-[typing_1s_ease-in-out_0.4s_infinite]" />
    </div>
  );
};

export default TypingIndicator;
