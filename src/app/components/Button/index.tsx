import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export default function Button({ isLoading, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`px-3 py-2 w-full bg-primary text-primaryText flex items-center  rounded-[8px] ${
        props.className ?? ""
      } active:brightness-90 md:hover:brightness-90`}
      disabled={props.disabled || isLoading}
    ></button>
  );
}
