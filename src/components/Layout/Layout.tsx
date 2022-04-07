import { FunctionComponent } from "react";
import { Outlet } from "react-router-dom";
import { auth } from "../../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigation } from "../Navigation/Navigation";
import { LoggedIn } from "../UserProfile/LoggedIn";
import { NotLoggedIn } from "../UserProfile/NotLoggedIn";

export const Layout: FunctionComponent = () => {
  const [user] = useAuthState(auth);

  return (
    <main className="main">
      <Navigation />
      <section className="content">
        <div className="user-profile">
          {user ? <LoggedIn /> : <NotLoggedIn />}
        </div>
        <Outlet />
      </section>
    </main>
  );
};
