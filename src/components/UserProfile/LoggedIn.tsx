import { FunctionComponent } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { MdLogout } from "react-icons/md";
import { ButtonRed } from "../atoms/ButtonRed";

export const LoggedIn: FunctionComponent = () => {
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
  };
  return (
    <div className="user-profile__credentials">
      <div className="user-profile__email">{user?.email}</div>
      <div className="user-profile__logout-btn">
        <ButtonRed type="button" onClick={logout} disabled={false}>
          WYLOGUJ
        </ButtonRed>
      </div>
    </div>
  );
};
