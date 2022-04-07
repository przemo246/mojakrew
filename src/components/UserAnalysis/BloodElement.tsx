import { FunctionComponent, Dispatch, SetStateAction, MouseEvent } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { bloodElements } from "../../ts/bloodElements";
import { Test, Element } from "../../../types/interfaces";
import { FaCheck, FaTrash, FaTimes, FaQuestionCircle } from "react-icons/fa";
import { auth, db } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

interface BloodElementProps {
  element: Element;
  currentTest: Test | null;
  setCurrentTest: Dispatch<SetStateAction<Test | null>>;
}

const filterElements = (obj: Test, id: string) => {
  const elementsFiltered = obj.elements.filter((el) => el.id !== id);
  return { ...obj, elements: elementsFiltered };
};

export const BloodElement: FunctionComponent<BloodElementProps> = ({
  element,
  currentTest,
  setCurrentTest,
}) => {
  const [user] = useAuthState(auth);
  const handleRemoveBloodElement = async (
    e: MouseEvent<SVGElement, globalThis.MouseEvent>
  ) => {
    const removedElementID = e.currentTarget.id;
    if (user && currentTest) {
      const q = query(
        collection(db, "users", user.uid, "tests"),
        where("id", "==", currentTest.id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (doc) => {
        const docRef = doc.ref;
        const { elements } = filterElements(currentTest, removedElementID);
        await updateDoc(docRef, {
          elements,
        });
      });
    }

    setCurrentTest((prev) => {
      if (prev) {
        return filterElements(prev, removedElementID);
      } else {
        return null;
      }
    });
  };
  return (
    <div className="blood-element" id={element.id}>
      <div className="blood-element__element-name">
        <span>{element.name}</span>
        <div className="tooltip-box">
          <FaQuestionCircle className="tooltip-icon" />
          <div className="tooltip">{bloodElements[element.id].description}</div>
        </div>
      </div>
      <div
        className={`blood-element__result ${
          element.result >= element.referenceFrom &&
          element.result <= element.referenceTo
            ? "user-pass"
            : "user-fail"
        }`}
      >
        <span>{element.result}</span>
        {element.result >= element.referenceFrom &&
        element.result <= element.referenceTo ? (
          <FaCheck className="blood-element__icon" />
        ) : (
          <FaTimes className="blood-element__icon" />
        )}
      </div>
      <div className="blood-element__unit">
        <span>{bloodElements[element.id].unit}</span>
      </div>
      <div className="blood-element__reference">
        <span>
          {element.referenceFrom} - {element.referenceTo}
        </span>
      </div>
      <div className="blood-element__delete-icon">
        <FaTrash
          className="blood-element__icon delete-icon"
          id={element.id}
          onClick={(e) => handleRemoveBloodElement(e)}
        />
      </div>
    </div>
  );
};
