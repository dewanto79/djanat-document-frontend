enum EColor {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  DISABLED = "disabled",
}

interface ChipProps {
  color: EColor;
  children: React.ReactNode;
  className?: string;
}

export default function Chip({ children, color, className }: ChipProps) {
  return (
    <div
      className={`${
        color === EColor.SUCCESS && `bg-green-200 text-green-700`
      } ${color === EColor.ERROR && `bg-warning bg-opacity-20 text-warning`} ${
        color === EColor.WARNING && `bg-[#fff8ee] text-primary`
      } ${className ?? ""} text-center px-3 py-1 rounded-full w-fit`}
    >
      {children}
    </div>
  );
}
