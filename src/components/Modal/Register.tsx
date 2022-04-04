import { FunctionComponent, useState } from "react";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const Register: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleCreateUser = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        return;
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <Form
      heading="Zarejestruj się"
      type="register"
      firebaseAction={handleCreateUser}
      errorMessage={errorMessage}
    />
  );
};
