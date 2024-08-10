import Button from "../Button";
import ModalsFrame, { ModalsFrameProps } from "../ModalsFrame";

interface ConfirmationModalsProps extends ModalsFrameProps {
  title: string;
  icons?: React.ReactNode;
  onAction?: () => void;
  actionText?: string;
  onReject?: () => void;
  onApprove?: () => void;
  rejectText?: string;
  approveText?: string;
}

export default function ConfirmationModals({
  title,
  open,
  onClose,
  children,
  icons,
  onAction,
  onReject,
  onApprove,
  rejectText = "Cancel",
  approveText = "Approve",
}: ConfirmationModalsProps) {
  return (
    <ModalsFrame open={open} onClose={onClose}>
      {icons && <div>{icons}</div>}
      <div className={`items-center flex justify-center flex-col`}>
        <div className={`text-2xl md:text-4xl font-bold text-center`}>
          {title}
        </div>
        <div className={` mt-2 text-center`}>{children}</div>
      </div>
      <div className={`flex items-center justify-center w-full gap-4`}>
        <button
          onClick={onReject || onClose}
          className={`px-4 py-2 border-2 border-warning text-warning font-medium bg-black bg-opacity-0 hover:bg-opacity-5 w-full rounded-lg `}
        >
          {rejectText}
        </button>
        <Button
          onClick={onApprove || onClose}
          className={`justify-center !bg-green-500 hover:!bg-green-600 !text-white w-full rounded-lg `}
        >
          {approveText}
        </Button>
      </div>
    </ModalsFrame>
  );
}
