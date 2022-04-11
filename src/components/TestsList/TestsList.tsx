import {
  FunctionComponent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { Test, TestOptions } from "../../../types/interfaces";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { TestPDF } from "./TestPDF";
import { MdMenu, MdDelete, MdOpenInNew, MdFileDownload } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface TestsListProps {
  tests: Test[];
  setCurrentTest: Dispatch<SetStateAction<Test | null>>;
}

export const TestsList: FunctionComponent<TestsListProps> = ({
  tests,
  setCurrentTest,
}) => {
  const [testOptionsWindow, setTestOptionsWindow] = useState<TestOptions[]>([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    const testOptions = tests.map((test) => ({
      id: test.id,
      isOptionsOpen: false,
    }));
    setTestOptionsWindow(testOptions);
  }, [tests]);
  const findTestOptionsObj = (id: number) => {
    return testOptionsWindow.find((el: TestOptions) => el.id === id);
  };

  const handleSetCurrentTest = (id: number) => {
    const result = tests.find((test) => test.id === id);
    if (result) {
      setCurrentTest(result);
      setTestOptionsWindow((prev) => {
        return prev.map((el) => {
          if (el.id === result.id) {
            return { ...el, isOptionsOpen: false };
          }
          return el;
        });
      });
      navigate("/");
    }
  };

  const removeTestFromDB = async (id: number) => {
    if (user) {
      const q = query(
        collection(db, "users", user.uid, "tests"),
        where("id", "==", id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "users", user.uid, "tests", document.id));
      });
      setCurrentTest((prev) => (prev?.id === id ? null : prev));
    }
  };

  const findIsOptionsOpen = (id: number) => {
    const result = findTestOptionsObj(id);
    if (result) {
      return result.isOptionsOpen;
    }
  };

  const toggleIsOptionsOpen = (id: number) => {
    const result = findTestOptionsObj(id);
    if (result) {
      setTestOptionsWindow((prev) => {
        return prev.map((el) => {
          if (el.id === result.id) {
            return { ...el, isOptionsOpen: !el.isOptionsOpen };
          }
          return el;
        });
      });
    }
  };
  return (
    <section className="tests">
      <h2 className="heading-primary">Badania</h2>
      <ul className="tests__list">
        <li className="tests__item">
          {tests.length > 0 ? (
            tests.map((test, i) => (
              <div
                className="user-tests__item"
                key={test.id}
                id={test.id.toString()}
              >
                <div className="user-tests__description">
                  <span className="red-label">{i + 1}. </span>
                  <span>
                    Badanie z dnia{" "}
                    {new Date(test.date).toLocaleDateString("en-GB")} w{" "}
                    {test.location}
                  </span>
                </div>
                <MdMenu
                  className="options-icon"
                  onClick={() => toggleIsOptionsOpen(test.id)}
                  title="Pokaż opcje"
                />
                <div
                  className="user-tests__options"
                  style={
                    findIsOptionsOpen(test.id)
                      ? { display: "flex" }
                      : { display: "none" }
                  }
                >
                  <div className="user-tests__buttons">
                    <MdOpenInNew
                      className="options-icon"
                      title="Otwórz badanie"
                      onClick={() => handleSetCurrentTest(test.id)}
                    />
                    <PDFDownloadLink
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "2.5rem",
                      }}
                      document={
                        <TestPDF
                          elements={test.elements}
                          date={test.date}
                          location={test.location}
                        />
                      }
                      fileName={`${test.id} - ${test.location} - ${test.date}`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? (
                          <AiOutlineLoading className="loading-spinner" />
                        ) : (
                          <MdFileDownload
                            className="options-icon"
                            title="Pobierz badanie"
                          />
                        )
                      }
                    </PDFDownloadLink>
                    <MdDelete
                      className="options-icon"
                      title="Usuń badanie"
                      onClick={() => removeTestFromDB(test.id)}
                    />
                  </div>
                  <MdMenu
                    className="options-icon"
                    onClick={() => toggleIsOptionsOpen(test.id)}
                    title="Pokaż badanie"
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="center-box">
              <span className="red-label">Brak dodanych badań</span>
            </div>
          )}
        </li>
      </ul>
    </section>
  );
};
