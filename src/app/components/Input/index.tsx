import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  groupClassName?: string;
  label?: string;
}

export default function Input({ label, groupClassName, ...props }: InputProps) {
  return (
    <div className={groupClassName ?? "flex flex-col gap-1 md:gap-2"}>
      {label && (
        <label className={``} htmlFor={props.id}>
          {label}
        </label>
      )}
      <div
        className={` px-4 py-2 rounded-md  border-2 border-secondaryText  hover:outline-primary focus-within:border-primary focus-within:shadow-sm focus-within:shadow-yellow-200`}
      >
        <input {...props} className={`focus:outline-none w-full`} />
      </div>
    </div>
  );
}
