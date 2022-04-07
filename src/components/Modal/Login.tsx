import { FunctionComponent, useState } from "react";
import { Form } from "./Form";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

export const Login: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        return;
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <Form
      heading="Zaloguj się"
      type="login"
      firebaseAction={handleLogin}
      errorMessage={errorMessage}
    />
  );
};
