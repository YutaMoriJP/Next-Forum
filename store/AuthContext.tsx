import { createContext, useContext, useEffect, useRef, useState } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";

import { generateNumber } from "../util/generateNum";

const initialContextValue = {
  login: () => {},
  logout: () => {},
  user: null,
  authReady: false,
};

type AuthContextValue =
  | typeof initialContextValue
  | {
      login: () => void;
      logout: () => void;
      user: User;
      authReady: boolean;
    };

const AuthContext = createContext<AuthContextValue>(initialContextValue);

//custom useAuth hook, which allows for easier use of the Auth context
export const useAuth = () => useContext(AuthContext);

const login = (): void => {
  netlifyIdentity.open();
};
const logout = (): void => {
  netlifyIdentity.logout();
};

const AuthContextComponent = ({ children }) => {
  //stores user data when logged in
  const [user, setUser] = useState<User | null>(null);
  //used to check if user was already logged in or not
  const [authReady, setAuthoReady] = useState(false);

  const contextValues = {
    user,
    login,
    logout,
    authReady,
  };

  //STILL NEEDS TO BE IMPLEMENTED
  //prevents 'logged in' message from appearing in the initial page load when user is already logged in
  const initialLoginRef = useRef(true);

  useEffect((): (() => void) => {
    //called when user logs in, callback receives user object
    //which is set to the user state
    netlifyIdentity.on("login", user => {
      setUser(user);
      //closes login modal
      netlifyIdentity.close();
      //state update for <Message/>

      initialLoginRef.current = false;
      console.log("logged in");
    });
    //called when user logs out, and user must be set to null again
    netlifyIdentity.on("logout", () => {
      setUser(null);
      //state update for <Message/>
      console.log("logged out");
    });
    netlifyIdentity.on("init", user => {
      console.log("user", user);
      setUser(user);
      setAuthoReady(true);
      console.log("init event");
    });
    //initializes netlify identity when component is mounted
    netlifyIdentity.init();

    //save data - might need to be re-factored to consider first time login, when does this function run ? after user signs up?
    const save = async () => {
      //if user is not logged in return
      if (!user) return;
      //used to check if user has already color id stored, if so return
      const currentUser = await netlifyIdentity.gotrue.currentUser();
      if (currentUser?.user_metadata?.color) {
        console.log("color stored so return");
        return;
      }
      const userSetting = { data: { color: generateNumber(1, 6) } };
      await netlifyIdentity.gotrue.currentUser().update(userSetting);
    };
    save();

    //cleanup
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  console.log("user", user);
  console.log("netlifyIdentity", netlifyIdentity);
  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;
