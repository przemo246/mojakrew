import { FunctionComponent } from "react";

interface ButtonRedProps {
  type: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
  disabled: boolean;
}

export const ButtonRed: FunctionComponent<ButtonRedProps> = ({
  type,
  onClick,
  disabled,
  children,
}) => {
  if (disabled) {
    return (
      <button type={type} className="btn btn-red" onClick={onClick} disabled>
        {children}
      </button>
    );
  } else {
    return (
      <button type={type} className="btn btn-red" onClick={onClick}>
        {children}
      </button>
    );
  }
};
