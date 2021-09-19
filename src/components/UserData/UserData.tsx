import React, { FunctionComponent, useState } from "react";
import DatePicker from "react-date-picker";

export const UserData: FunctionComponent = () => {
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date && location) {
      console.log("Submit form");
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
        <button type="button" className="btn btn-red">
          Wyczyść
        </button>
      </form>
    </section>
  );
};
