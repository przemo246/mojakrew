import { FunctionComponent } from "react";
import { Element } from "../../../types/interfaces";
import { bloodElements } from "../../ts/bloodElements";

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
        <div className="query-box">
          <span>?</span>
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
      </div>
      <div className="blood-element__unit">
        <span>{bloodElements[element.id].unit}</span>
      </div>
      <div className="blood-element__reference">
        <span>
          {element.referenceFrom} - {element.referenceTo}
        </span>
        <div className="blood-element__delete-icon"> {/* Delete icon */}</div>
      </div>
    </div>
  );
};
