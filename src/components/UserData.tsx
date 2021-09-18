import { FunctionComponent } from "react";

export const UserData: FunctionComponent = () => {
  return (
    <section className="user-data">
      <span className="order-number">1</span>
      <h1 className="heading-primary">Uzupełnij informacje o badaniu</h1>
      <form className="user-data__form">
        <label htmlFor="test-date" className="red-label">
          data
        </label>
        <input type="date" name="test-date" id="test-date" />
        <label htmlFor="test-location" className="red-label">
          nazwa i adres placówki
        </label>
        <input
          type="text"
          name="test-location"
          placeholder="np. Bruss, Aleja Grunwaldzka 60, Gdańsk"
        />
        <button type="submit" className="btn btn-red">
          OK
        </button>
        <button type="reset" className="btn btn-red">
          Wyczyść
        </button>
      </form>
    </section>
  );
};
