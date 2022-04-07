import { FunctionComponent, useState } from "react";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

export const Register: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleCreateUser = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const ref = doc(
          collection(db, "users", userCredentials.user.uid, "tests")
        );
        await setDoc(ref, {});
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
