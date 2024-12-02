type Props = {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const SkeltonButton = (props: Props) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className="text-white rounded-xl bg-gray-500 hover:bg-gray-300  px-4 py-2 font-semibold">
      {props.children}
    </button>
  );
};
