import { FunctionComponent } from "react";

interface LabelProps {
  htmlFor: string;
}

export const Label: FunctionComponent<LabelProps> = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="red-label">
      {children}
    </label>
  );
};
