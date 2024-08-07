import ModalsFrame, { ModalsFrameProps } from "../ModalsFrame";

interface FeedbackModalsProps extends ModalsFrameProps {
  title: string;
  icons?: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
}

export default function FeedbackModals({
  title,
  open,
  onClose,
  children,
  icons,
  onAction,
  actionText = "action",
}: FeedbackModalsProps) {
  return (
    <ModalsFrame open={open} onClose={onClose}>
      {icons && <div>{icons}</div>}
      <div className={`items-center flex justify-center flex-col`}>
        <div className={`text-2xl md:text-4xl font-bold text-center`}>
          {title}
        </div>
        <div className={` mt-2 text-center`}>{children}</div>
      </div>
      {actionText && (
        <div className="w-full ">
          <button
            className={`w-full bg-black text-white rounded-lg px-4 py-3`}
            onClick={onAction}
          >
            {actionText}
          </button>
        </div>
      )}
    </ModalsFrame>
  );
}
