import { FunctionComponent } from "react";
import { Test } from "../../../types/interfaces";
import { UserAnalysis } from "../UserAnalysis/UserAnalysis";
import { UserData } from "../UserData/UserData";
import { UserResults } from "../UserResults/UserResults";

interface DashboardProps {
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
  currentTest: Test | null;
}

export const Dashboard: FunctionComponent<DashboardProps> = ({
  setCurrentTest,
  currentTest,
}) => {
  return (
    <>
      <UserData setCurrentTest={setCurrentTest} currentTest={currentTest} />
      <UserResults currentTest={currentTest} setCurrentTest={setCurrentTest} />
      <UserAnalysis currentTest={currentTest} setCurrentTest={setCurrentTest} />
    </>
  );
};
