import React, { FunctionComponent, useState } from "react";
import { Test, Element } from "../../../types/interfaces";
import { bloodElements } from "../../ts/bloodElements";

interface UserResultProps {
  currentTest: Test | null;
  setTests: React.Dispatch<React.SetStateAction<Test[]>>;
  setCurrentTest: React.Dispatch<React.SetStateAction<Test | null>>;
}

export const UserResults: FunctionComponent<UserResultProps> = ({
  currentTest,
  setTests,
  setCurrentTest,
}) => {
  const [results, setResults] = useState<Element>({
    id: "",
    name: "",
    referenceFrom: "",
    referenceTo: "",
    result: "",
  });

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id) {
      setResults((prev) => ({ ...prev, id, name: bloodElements[id].name }));
    } else {
      setResults((prev) => ({ ...prev, id }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResults((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, name } = results;
    const referenceFrom = Number(results.referenceFrom);
    const referenceTo = Number(results.referenceTo);
    const result = Number(results.result);
    if (
      id &&
      name &&
      referenceFrom > 0 &&
      referenceTo > 0 &&
      referenceFrom < referenceTo &&
      result > 0 &&
      currentTest
    ) {
      const bloodElementObj: Element = {
        id,
        name,
        referenceFrom,
        referenceTo,
        result,
      };
      setCurrentTest((prev: any) => ({
        ...prev,
        elements: [...prev.elements, bloodElementObj],
      }));
      setTests((prev: Test[]): Test[] => {
        return prev.map((obj: Test) => {
          if (obj.id === currentTest?.id) {
            return { ...obj, elements: [...obj.elements, bloodElementObj] };
          }
          return obj;
        });
      });
      setResults({
        id: "",
        name: "",
        referenceFrom: "",
        referenceTo: "",
        result: "",
      });
    }
  };

  return (
    <section className="user-results">
      <span className="order-number">2</span>
      <h1 className="heading-primary">Wprowadź wyniki morfologii krwi</h1>
      <form className="user-results__form">
        <label htmlFor="test" className="red-label">
          badanie
        </label>
        <select
          name="test"
          id="test"
          value={results.id}
          onChange={handleOptionChange}
        >
          <option value="">-</option>
          <option value="leukocyty">Leukocyty [C30]</option>
          <option value="erytrocyty">Erytrocyty [C02]</option>
          <option value="hemoglobina">Hemoglobina</option>
          <option value="hematokryt">Hematokryt</option>
          <option value="mcv">MCV</option>
          <option value="mch">MCH</option>
          <option value="mchc">MCHC</option>
          <option value="rdw">RDW</option>
          <option value="plytkikrwi">Płytki krwi [C66]</option>
          <option value="mpv">MPV</option>
          <option value="neutrocyty">Neutrocyty</option>
          <option value="limfocyty">Limfocyty</option>
          <option value="monocyty">Monocyty</option>
          <option value="eozynocyty">Eozynocyty</option>
          <option value="bazocyty">Bazocyty</option>
          <option value="ig">IG</option>
        </select>
        <label htmlFor="result" className="red-label">
          wynik
        </label>
        <input
          type="number"
          name="result"
          id="result"
          min="0"
          value={results.result}
          onChange={handleInputChange}
        />
      </form>
      <form className="user-results__form" onSubmit={handleSubmitForm}>
        <label htmlFor="referenceFrom" className="red-label">
          wart. referencyjna od
        </label>
        <input
          type="number"
          name="referenceFrom"
          id="referenceFrom"
          min="0"
          value={results.referenceFrom}
          onChange={handleInputChange}
        />
        <label htmlFor="referenceTo" className="red-label">
          do
        </label>
        <input
          type="number"
          name="referenceTo"
          id="referenceTo"
          min="0"
          value={results.referenceTo}
          onChange={handleInputChange}
        />
        <button className="btn btn-red" disabled={!currentTest ? true : false}>
          Dodaj
        </button>
      </form>
    </section>
  );
};
