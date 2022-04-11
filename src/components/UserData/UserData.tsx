import {
  FunctionComponent,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";
import { Test } from "../../../types/interfaces";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../atoms/Notification";
import { Label } from "../atoms/Label";
import { ButtonRed } from "../atoms/ButtonRed";
import { AlertColor } from "@mui/material/Alert";
import { db } from "../../firebase.config";
import { addDoc, collection } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";

interface UserDataProps {
  setCurrentTest: Dispatch<SetStateAction<Test | null>>;
  currentTest: Test | null;
}

interface UserDataForm {
  location: string;
  date: string | number;
}

const emptyForm = {
  location: "",
  date: "",
};

export const UserData: FunctionComponent<UserDataProps> = ({
  setCurrentTest,
  currentTest,
}) => {
  const [data, setData] = useState<UserDataForm>({ location: "", date: "" });
  const [notification, setNotification] = useState<{
    type: AlertColor;
    message: string;
  }>({ type: "info", message: "" });
  const [isNotificationOpen, toggleIsNotificationOpen] = useNotification();
  const [user] = useAuthState(auth);
  const { location, date } = data;
  useEffect(() => {
    if (currentTest) {
      setData({ location: currentTest.location, date: currentTest.date });
    } else {
      setData(emptyForm);
    }
  }, [currentTest]);
  const addTestToDatabase = async (test: Test) => {
    if (user) {
      await addDoc(collection(db, "users", user.uid, "tests"), {
        ...test,
      });
    }
  };
  const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (date && location) {
      const id = Number(Date.now().toString().slice(-5));
      const currentTestObj = { id, date, location, elements: [] };
      setCurrentTest(currentTestObj);
      addTestToDatabase(currentTestObj);
      setNotification({ type: "success", message: "Dodano nowe badanie" });
      if (!user) {
        setNotification({
          type: "info",
          message: "Utwórz konto, aby zapisać badanie",
        });
      }
      toggleIsNotificationOpen();
    }
  };

  const handleResetTestData = () => {
    setData(emptyForm);
    setCurrentTest(null);
  };

  return (
    <section className="user-data">
      <span className="order-number">1</span>
      <h1 className="heading-primary">Uzupełnij informacje o badaniu</h1>
      <form onSubmit={handleSubmitForm} className="user-data__form">
        <Label htmlFor="date">data</Label>
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setData((prev) => ({ ...prev, date: e.target.value }))
          }
          name="date"
          id="date"
          required
        />
        <Label htmlFor="location">miejsce</Label>
        <div className="user-data__location">
          <input
            type="text"
            name="location"
            id="location"
            placeholder="np. Bruss, Aleja Grunwaldzka 60, Gdańsk"
            onChange={(e) =>
              setData((prev) => ({ ...prev, location: e.target.value }))
            }
            value={location}
            required
          />
        </div>
        <ButtonRed type="submit" disabled={location && date ? false : true}>
          OK
        </ButtonRed>
        <ButtonRed type="button" onClick={handleResetTestData} disabled={false}>
          RESETUJ
        </ButtonRed>
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
