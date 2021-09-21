import { FunctionComponent } from "react";
import { Element } from "../../../types/interfaces";

interface BloodElementProps {
  element: Element;
}

export const BloodElement: FunctionComponent<BloodElementProps> = ({
  element,
}) => {
  return (
    <div className="blood-element">
      <div className="blood-element__element-name">
        <span>IG</span>
        <div className="query-box">
          <span>?</span>
        </div>
      </div>
      <div className="blood-element__result user-pass">
        <span>10</span>
        {/*  */}
      </div>
      <div className="blood-element__unit">
        <span>G/l</span>
      </div>
      <div className="blood-element__reference">
        <span>10 - 11</span>
        <div className="blood-element__delete-icon"> {/* Delete icon */}</div>
      </div>
    </div>
  );
};
