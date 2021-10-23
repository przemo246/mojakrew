import React, { FunctionComponent, useState } from "react";
import DatePicker from "react-date-picker";
import { Test } from "../../../types/interfaces";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../Notification";
import { AlertColor } from "@mui/material/Alert";

interface UserDataProps {
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
}

export const UserData: FunctionComponent<UserDataProps> = ({
  setTests,
  setCurrentTest,
}) => {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | null>(null);
  const [notification, setNotification] = useState<{
    type: AlertColor;
    message: string;
  }>({ type: "info", message: "" });
  const [isNotificationOpen, toggleIsNotificationOpen] = useNotification();
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date && location) {
      const id = Number(Date.now().toString().slice(-5));
      const currentTestObj = { id, date, location, elements: [] };
      setCurrentTest(currentTestObj);
      setTests((prevState) => [...prevState, currentTestObj]);
      setNotification({ type: "success", message: "Dodano nowe badanie" });
      toggleIsNotificationOpen();
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  return (
    <section className="user-data">
      <span className="order-number">1</span>
      <h1 className="heading-primary">Uzupełnij informacje o badaniu</h1>
      <form onSubmit={handleSubmitForm} className="user-data__form">
        <label htmlFor="date" className="red-label">
          data
        </label>
        <DatePicker value={date} onChange={setDate} name="date" />
        <label htmlFor="location" className="red-label">
          nazwa i adres placówki
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="np. Bruss, Aleja Grunwaldzka 60, Gdańsk"
          onChange={handleLocationChange}
          value={location}
        />
        <button type="submit" className="btn btn-red">
          OK
        </button>
      </form>
      <Notification
        type={notification.type}
        message={notification.message}
        isNotificationOpen={isNotificationOpen}
        toggleIsNotificationOpen={toggleIsNotificationOpen}
      />
    </section>
  );
};
