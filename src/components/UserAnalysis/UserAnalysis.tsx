import { FunctionComponent } from "react";
import { Test } from "../../../types/interfaces";
import { BloodElement } from "./BloodElement";

interface UserAnalysisProps {
  currentTest: Test | null;
}

export const UserAnalysis: FunctionComponent<UserAnalysisProps> = ({
  currentTest,
}) => {
  return (
    <section className="user-analysis">
      <div className="headings">
        <h2 className="heading-secondary">BADANIE</h2>
        <h2 className="heading-secondary">WYNIK</h2>
        <h2 className="heading-secondary">JEDNOSTKI</h2>
        <h2 className="heading-secondary">WART. REFERENCYJNA</h2>
      </div>
      <div className="elements-list">
        {currentTest?.elements
          ? currentTest.elements.map((element) => (
              <BloodElement key={element.id} element={element} />
            ))
          : null}
      </div>
    </section>
  );
};
