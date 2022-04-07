import "./scss/main.scss";
import { FunctionComponent, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Test } from "../types/interfaces";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TestsList } from "./components/TestsList/TestsList";
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "./firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

export const App: FunctionComponent = () => {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const testsFromDB: any = [];
      const q = query(collection(db, "users", user.uid, "tests"));
      return onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          testsFromDB.push(doc.data());
        });
        setTests([...testsFromDB]);
      });
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Dashboard
              setCurrentTest={setCurrentTest}
              currentTest={currentTest}
            />
          }
        />
        <Route
          path="/tests-list"
          element={<TestsList tests={tests} setCurrentTest={setCurrentTest} />}
        />
      </Route>
    </Routes>
  );
};
