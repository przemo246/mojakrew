import {
  FunctionComponent,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Test, Element } from "../../../types/interfaces";
import { auth, db } from "../../firebase.config";
import { bloodElements } from "../../ts/bloodElements";
import { ButtonRed } from "../atoms/ButtonRed";
import { Label } from "../atoms/Label";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

interface UserResultProps {
  currentTest: Test | null;
  setCurrentTest: Dispatch<SetStateAction<Test | null>>;
}

export const UserResults: FunctionComponent<UserResultProps> = ({
  currentTest,
  setCurrentTest,
}) => {
  const [results, setResults] = useState<Element>({
    id: "",
    name: "",
    referenceFrom: "",
    referenceTo: "",
    result: "",
  });
  const [user] = useAuthState(auth);

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (id) {
      setResults((prev) => ({ ...prev, id, name: bloodElements[id].name }));
    } else {
      setResults((prev) => ({ ...prev, id }));
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResults((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, name } = results;
    const referenceFrom = Number(results.referenceFrom);
    const referenceTo = Number(results.referenceTo);
    const result = Number(results.result);
    const index = currentTest?.elements.findIndex((el) => el.id === id);
    if (
      index === -1 &&
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

      if (user) {
        const q = query(
          collection(db, "users", user.uid, "tests"),
          where("id", "==", currentTest.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          const docRef = doc.ref;
          await updateDoc(docRef, {
            elements: arrayUnion(bloodElementObj),
          });
        });
      }

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
        <Label htmlFor="test">badanie</Label>
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
        <Label htmlFor="result">wynik</Label>
        <input
          type="number"
          name="result"
          id="result"
          step="0.01"
          min="0"
          value={results.result}
          onChange={handleInputChange}
        />
      </form>
      <form className="user-results__form" onSubmit={handleSubmitForm}>
        <Label htmlFor="referenceFrom">wart. referencyjna od</Label>
        <input
          type="number"
          name="referenceFrom"
          id="referenceFrom"
          step="0.01"
          min="0"
          value={results.referenceFrom}
          onChange={handleInputChange}
        />
        <Label htmlFor="referenceTo">do</Label>
        <input
          type="number"
          name="referenceTo"
          id="referenceTo"
          step="0.01"
          min="0"
          value={results.referenceTo}
          onChange={handleInputChange}
        />
        <ButtonRed type="submit" disabled={!currentTest ? true : false}>
          Dodaj
        </ButtonRed>
      </form>
    </section>
  );
};
