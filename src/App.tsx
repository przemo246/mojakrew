import "./scss/main.scss";
import { FunctionComponent, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Test } from "../types/interfaces";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { TestsList } from "./components/TestsList/TestsList";

export const App: FunctionComponent = () => {
  const [currentTest, setCurrentTest] = useState<Test | null>(null);
  const [tests, setTests] = useState<Test[]>([]);

  useEffect(() => {
    const storedTests = localStorage.getItem("tests");
    if (storedTests) {
      setTests(JSON.parse(storedTests));
    }
  }, []);

  useEffect(() => {
    if (tests.length > 0) {
      localStorage.setItem("tests", JSON.stringify(tests));
    } else {
      localStorage.clear();
    }
  }, [tests]);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <Dashboard
              setTests={setTests}
              setCurrentTest={setCurrentTest}
              currentTest={currentTest}
            />
          }
        />
        <Route
          path="/tests-list"
          element={
            <TestsList
              tests={tests}
              setCurrentTest={setCurrentTest}
              setTests={setTests}
            />
          }
        />
      </Route>
    </Routes>
  );
};
