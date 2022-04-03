import { FunctionComponent } from "react";
import { Test } from "../../../types/interfaces";
import { UserAnalysis } from "../UserAnalysis/UserAnalysis";
import { UserData } from "../UserData/UserData";
import { UserResults } from "../UserResults/UserResults";

interface DashboardProps {
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
  currentTest: Test | null;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({
  setTests,
  setCurrentTest,
  currentTest,
}) => {
  return (
    <>
      <UserData
        setTests={setTests}
        setCurrentTest={setCurrentTest}
        currentTest={currentTest}
      />
      <UserResults
        setTests={setTests}
        currentTest={currentTest}
        setCurrentTest={setCurrentTest}
      />
      <UserAnalysis
        currentTest={currentTest}
        setTests={setTests}
        setCurrentTest={setCurrentTest}
      />
    </>
  );
};
