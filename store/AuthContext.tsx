import { createContext, useContext, useEffect, useRef, useState } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";

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

const login = () => {
  netlifyIdentity.open();
};
const logout = () => {
  netlifyIdentity.logout();
};

const AuthContextComponent = ({ children }) => {
  //stores user data when logged in
  const [user, setUser] = useState<User | null>(null);
  //used to check if user was already logged in or not, used index.tsx
  const [authReady, setAuthoReady] = useState(false);

  const contextValues = {
    user,
    login,
    logout,
    authReady,
  };

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

    //cleanup
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextComponent;
/*

import { createContext, useContext, useReducer, useEffect } from "react";
import netlifyIdentity, { User } from "netlify-identity-widget";

//helper functions
//login - logs in user
const login = () => {
  console.log("login");
  netlifyIdentity.open(); //opens up login modal, if user logs in, 'LOGIN' event is fired, dispatches state update to update user state
};
//logout - logs out user
const logout = () => {
  console.log("logout");
  netlifyIdentity.logout(); //calls 'LOGOUT' event handler, dispatches state update and sets user state to null
};

//user: stores logged in user data from netlify identity
//authReady: controls whether netlify identity has rendered, and can authorize user, so tell us whether user is logged in or not
//login: function called to open up login modal
//logout: function called to logout user
const initialState = { user: null, authReady: false, login, logout };

//Context types for TypeScript
type Action =
  | { type: "login" | "auth"; payload: { user: User } }
  | { type: "logout" };

type State =
  | typeof initialState
  | { user: User; authReady: true; login: typeof login; logout: typeof logout };

//Context stuff, like sets up context object, context hook, update state with reducer etc.
const Context = createContext(null);

export const useAuth = () => useContext(Context);

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    //called when user logs in to set user state to user object
    case "login":
      return { ...state, user: action.payload.user };
    case "logout":
      //called when user logs out to set user state to null
      return { ...state, user: null };
    case "auth": {
      return { ...state, user: action.payload.user, authReady: true };
    }
  }
};

const lazyLoad = (state: typeof initialState) => state;

const AuthContext = ({ children }): JSX.Element => {
  console.log(`AuthContext rendered`);
  const [state, dispatch] = useReducer(reducer, initialState, lazyLoad);

  //registers netlify identity, register events like listening on LOGIN/LOGOUT, as well as clean up when component is unmounted
  useEffect(() => {
    console.log(
      `AuthContext effect called to subscribe events on netlifyIdentity`
    );
    //initialize Netlify when component is mounted, or else netlifyIdentity events won't be calle, like open()
    netlifyIdentity.init();

    //called when user is already logged in, like a returning user, and sets user state to their user object
    netlifyIdentity.on("init", (user: User) => {
      console.log("user is", user);
      //update authReady to true to indicate user can be authenticated by netlifyIdentity
      //and set user object to user state
      dispatch({ type: "auth", payload: { user } });
    });

    //called when user clicks on 'LOGIN', and sets user state to user object, so it can be accessed from anywhere
    netlifyIdentity.on("login", (user: User) => {
      console.log("user object", user);
      //pass user object to payload, which updates uer state to user object
      dispatch({ type: "login", payload: { user } });
    });

    //called when user clicks on 'LOGOUT' and must set user state to null
    netlifyIdentity.on("logout", () => {
      console.log("user has logged");
      //update user state to null as user has logged out
      dispatch({ type: "logout" });
    });
    //cleanup
    return () => {
      netlifyIdentity.off("login");
      netlifyIdentity.off("logout");
    };
  }, []);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default AuthContext;
*/
