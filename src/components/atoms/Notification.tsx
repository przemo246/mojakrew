import { forwardRef, SyntheticEvent } from "react";
import { FunctionComponent } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";

interface NotificationProps {
  type: AlertColor;
  message: string;
  isNotificationOpen: boolean;
  toggleIsNotificationOpen: () => void;
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Notification: FunctionComponent<NotificationProps> = ({
  type,
  message,
  isNotificationOpen,
  toggleIsNotificationOpen,
}) => {
  if (!isNotificationOpen) return null;
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    toggleIsNotificationOpen();
  };

  return (
    <Snackbar
      open={isNotificationOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        sx={{
          width: "100%",
          fontSize: "1.4rem",
          fontFamily: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
