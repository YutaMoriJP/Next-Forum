import Button from "../Button/index";
import { useAuth } from "../../store/AuthContext";
import Loading from "../Loading/index";
import Navbar from "../../styles/Navbar";

const Nav = () => {
  const [{ login, logout, authReady, user }] = useAuth();
  console.log("login", login);
  return (
    <>
      <>
        <Navbar>
          <Button onClick={login}>LOGIN</Button>
          <Button onClick={logout}>LOGOUT</Button>
          <pre>{JSON.stringify(user, null, 2)}</pre>
          <pre> {JSON.stringify(authReady)}</pre>
        </Navbar>
      </>
    </>
  );
};

export default Nav;
