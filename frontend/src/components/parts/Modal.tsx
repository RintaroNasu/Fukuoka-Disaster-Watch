import React, { useEffect } from "react";

type Props = {
  isOpen: boolean;
  className?: string;
  children: React.ReactNode;
  onClose?: () => void;
};
export const Modal = (props: Props) => {
  const onClickOutsideModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      props.onClose?.();
    }
  };

  useEffect(() => {
    if (props.isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [props.isOpen]);

  return (
    <div
      onClick={onClickOutsideModal}
      className={`fixed z-[2000] left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.5)]
        ${props.isOpen ? "visible" : "hidden"}`}
    >
      <div
        className={`overflow-y-auto rounded-2xl bg-[#0f1b2a] px-8 py-5
          ${props.className ? props.className : ""}`}
      >
        {props.children}
      </div>
    </div>
  );
};
