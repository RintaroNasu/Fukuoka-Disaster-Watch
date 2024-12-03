type Props = {
  className?: string;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export const PrimaryButton = ({ onClick, disabled, loading, children, className }: Props) => {
  const isButtonDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      disabled={isButtonDisabled}
      className={`text-white rounded-xl px-4 py-2 
        ${isButtonDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"} 
        font-semibold ${className}`}
    >
      {children}
    </button>
  );
};
