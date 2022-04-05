import { FunctionComponent, useState } from "react";
import { Form } from "./Form";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";

export const Register: FunctionComponent = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const handleCreateUser = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const { uid } = userCredential.user;
        await setDoc(doc(db, "users", uid), {});
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
