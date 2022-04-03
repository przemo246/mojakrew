import { FunctionComponent } from "react";
import { Form } from "./Form";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";

export const Register: FunctionComponent = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  return (
    <Form
      heading="Zarejestruj się"
      type="register"
      firebaseAction={signInWithEmailAndPassword}
      errorMessage={error?.message}
    />
  );
};
