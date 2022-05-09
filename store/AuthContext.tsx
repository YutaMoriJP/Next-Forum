import { createContext, useContext, useEffect, useRef, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { generateNumber } from "../util/generateNum";
import { useToggle } from "kantan-hooks";

import type { ReactNode } from "react";

const initialContextValue = {
  login: () => {},
  logout: () => {},
  user: null,
  authReady: false,
  message: "",
  open: false,
  onClose: () => {}
};

interface User {
  api: {
    _sameOrigin?: boolean | undefined;
    apiURL: string;
    defaultHeaders: {
      [header: string]: string | string[] | undefined;
    };
  };
  app_metadata: {
    provider: string;
    roles: string[];
  };
  aud: string;
  audience?: any;
  confirmed_at: string;
  created_at: string;
  updated_at: string;
  invited_at: string;
  recovery_sent_at: string;
  email: string;
  id: string;
  role: string;
  url: string;
  user_metadata: {
    avatar_url?: string;
    full_name?: string;
    color?: string;
  } | null;
}

type AuthContextValue =
  | typeof initialContextValue
  | {
      login: () => void;
      logout: () => void;
      user: User;
      authReady: boolean;
      message: string;
      onClose: () => void;
      open: boolean;
    };

const AuthContext = createContext<AuthContextValue>(initialContextValue);

//  Custom useAuth hook, which allows for easier use of the Auth context
export const useAuth = () => useContext(AuthContext);

const login = (): void => {
  netlifyIdentity.open();
};

const logout = (): void => {
  netlifyIdentity.logout();
};

const AuthContextComponent = ({ children }: { children: ReactNode }) => {
  // stores user data when logged in
  const [user, setUser] = useState<User | null>(null);

  // used to check if user was already logged in or not
  const [authReady, setAuthReady] = useState(false);

  // controls message component when user logs in/out
  const { open, onClose, onOpen } = useToggle(false);

  // sets message to 'Logged in' and 'Logged out'
  const [message, setMessage] = useState<string>("");
  // prevents 'logged in' message from appearing in the initial page load when user is already logged in

  const initialLoginRef = useRef(true);

  const contextValues = {
    user,
    login,
    logout,
    authReady,
    open,
    onClose,
    message
  };

  useEffect((): (() => void) => {
    // called when user logs in, callback receives user object
    // which is set to the user state
    netlifyIdentity.on("login", (user) => {
      setUser(user);
      // closes login modal
      netlifyIdentity.close();
      // state update for <Message/>

      // prevents message component from rendering in initial render(s)
      if (!initialLoginRef.current) {
        onOpen();
        setMessage("Logged in");
      }
    });

    // called when user logs out, and user must be set to null again
    netlifyIdentity.on("logout", () => {
      setUser(null);
      // state update for <Message/>
      onOpen();
      setMessage("Logged out");
      console.log("logged out");
    });

    netlifyIdentity.on("init", (user) => {
      setUser(user);
      setAuthReady(true);
      console.log("init event");
    });
    // initializes netlify identity when component is mounted
    netlifyIdentity.init();

    // TODO might need to be re-factored to consider first time login, when does this function run ? after user signs up?
    // save data
    const save = async () => {
      // if user is not logged in return
      if (!user) return;

      // used to check if user has already color id stored, if so return
      // @ts-ignore
      const currentUser = await netlifyIdentity.gotrue.currentUser();

      if (currentUser?.user_metadata?.color) {
        console.log("color stored so return");

        return;
      }

      const userSetting = { data: { color: generateNumber(1, 6) } };
      // @ts-ignore
      await netlifyIdentity.gotrue.currentUser().update(userSetting);
    };

    save();

    // Cleanup to avoid side-effects
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, [onOpen, user]);

  useEffect(() => {
    //  Needed to correctly render message logged in/out
    initialLoginRef.current = false;
  }, []);

  console.log("user", user);
  console.log("netlifyIdentity", netlifyIdentity);

  return <AuthContext.Provider value={contextValues}>{children}</AuthContext.Provider>;
};

export default AuthContextComponent;
