import { useState } from "react";

export const useNotification = (): [boolean, () => void] => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const toggleIsNotificationOpen = () =>
    setIsNotificationOpen(!isNotificationOpen);
  return [isNotificationOpen, toggleIsNotificationOpen];
};
