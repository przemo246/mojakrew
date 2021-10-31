import React, { FunctionComponent, useState } from "react";
import { Test } from "../../../types/interfaces";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../Notification";
import { AlertColor } from "@mui/material/Alert";
import { IoMdClose } from "react-icons/io";

interface UserDataProps {
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
}

export const UserData: FunctionComponent<UserDataProps> = ({
  setTests,
  setCurrentTest,
}) => {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<string | number>("");
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

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.currentTarget.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
  };

  const handleClearLocationInput = () => {
    setLocation("");
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
          onChange={(e) => handleDateChange(e)}
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
            onChange={handleLocationChange}
            value={location}
          />
          <div className="clear-btn">
            <IoMdClose
              className="clear-icon"
              size="19px"
              onClick={handleClearLocationInput}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-red"
          disabled={!location && !date ? true : false}
        >
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
