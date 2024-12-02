type Props = {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const PrimaryButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`text-white rounded-2xl px-4 py-2 bg-blue-500  font-semibold
        ${props.disabled ? "cursor-not-allowed bg-blue-400" : "hover:bg-blue-700"} 
        ${props.className}`}
    >
      {props.children}
    </button>
  );
};
