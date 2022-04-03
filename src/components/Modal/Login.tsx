import { FunctionComponent } from "react";
import { Form } from "./Form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";

export const Login: FunctionComponent = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  return (
    <Form
      heading="Zaloguj się"
      type="login"
      firebaseAction={signInWithEmailAndPassword}
      errorMessage={error?.message}
    />
  );
};
