import { FunctionComponent } from "react";
import { Element } from "../../../types/interfaces";
import { bloodElements } from "../../ts/bloodElements";
import { FaCheck, FaTrash, FaTimes, FaQuestionCircle } from "react-icons/fa";

interface BloodElementProps {
  element: Element;
}

export const BloodElement: FunctionComponent<BloodElementProps> = ({
  element,
}) => {
  return (
    <div className="blood-element" id={element.id}>
      <div className="blood-element__element-name">
        <span>{element.name}</span>
        <FaQuestionCircle className="popup-icon" />
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
        <FaTrash className="blood-element__icon delete-icon" />
      </div>
    </div>
  );
};
