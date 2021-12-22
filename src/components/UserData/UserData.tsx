import React, { FunctionComponent, useEffect, useState } from "react";
import { Test } from "../../../types/interfaces";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../Notification";
import { AlertColor } from "@mui/material/Alert";

interface UserDataProps {
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
  currentTest: Test | null;
}

export const UserData: FunctionComponent<UserDataProps> = ({
  setTests,
  setCurrentTest,
  currentTest,
}) => {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string | number>("");
  const [notification, setNotification] = useState<{
    type: AlertColor;
    message: string;
  }>({ type: "info", message: "" });
  const [isNotificationOpen, toggleIsNotificationOpen] = useNotification();
  useEffect(() => {
    if (currentTest) {
      setLocation(currentTest.location);
      setDate(currentTest.date);
    } else {
      setLocation("");
      setDate("");
    }
  }, [currentTest]);
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

  const handleAddNewTest = () => {
    setLocation("");
    setDate("");
    setCurrentTest(null);
  };

  return (
    <section className="user-data">
      <span className="order-number">1</span>
      <h1 className="heading-primary">Uzupełnij informacje o badaniu</h1>
      <form onSubmit={handleSubmitForm} className="user-data__form">
        <label htmlFor="date" className="red-label">
          data
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          name="date"
          id="date"
        />
        <label htmlFor="location" className="red-label">
          nazwa i adres placówki
        </label>
        <div className="user-data__location">
          <input
            type="text"
            name="location"
            id="location"
            placeholder="np. Bruss, Aleja Grunwaldzka 60, Gdańsk"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </div>
        <button
          type="submit"
          className="btn btn-red"
          disabled={location && date ? false : true}
        >
          OK
        </button>
        <button
          type="button"
          style={{ marginLeft: "1rem" }}
          className="btn btn-red"
          onClick={handleAddNewTest}
        >
          Nowe badanie
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
