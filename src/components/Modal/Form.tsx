import { FunctionComponent, useState } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import googleSigninButton from "../../assets/img/btn_google_signin_light_pressed_web@2x.png";
import { auth } from "../../firebase.config";
import { ButtonRed } from "../atoms/ButtonRed";
import { Label } from "../atoms/Label";

interface FormProps {
  heading: string;
  type: string;
  firebaseAction: (email: string, password: string) => void;
  errorMessage: string | undefined;
}

export const Form: FunctionComponent<FormProps> = ({
  heading,
  type,
  firebaseAction,
  errorMessage,
}) => {
  const [data, setData] = useState({ email: "", password: "" });
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  return (
    <>
      <h1 className="heading-primary">{heading}</h1>
      <form className="modal__form">
        <div className="modal__inputs">
          <Label htmlFor="email">E-mail</Label>
          <input
            type="text"
            id="email"
            name="email"
            value={data.email}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="modal__inputs">
          <Label htmlFor="password">Password</Label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleOnChange}
            required
          />
        </div>
        <ButtonRed
          type="button"
          onClick={() => firebaseAction(data.email, data.password)}
          disabled={data.email && data.password ? false : true}
        >
          OK
        </ButtonRed>
        <div className="error-message">{errorMessage ? errorMessage : ""}</div>
        {type === "login" ? (
          <button type="button" onClick={() => signInWithGoogle()}>
            <img
              src={googleSigninButton}
              alt="Sign in with Google"
              className="vendor-img"
            />
          </button>
        ) : null}
      </form>
    </>
  );
};
