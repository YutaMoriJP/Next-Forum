import Button from "../Button/index";
import { useAuth } from "../../store/AuthContext";
import Loading from "../Loading/index";
import Navbar from "../../styles/Navbar";
import Text from "../../styles/Text";
import IconButton from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import Link from "next/link";

const Nav = () => {
  const { login, logout, authReady, user } = useAuth();
  console.log("user", user);
  console.log("authReady", authReady);

  const handleClick = () => {
    if (user) {
      logout();
    } else {
      login();
    }
  };
  return (
    <>
      <>
        <Navbar>
          {!authReady && <Loading />}
          {authReady && (
            <Button onClick={handleClick}>{user ? "LOGOUT" : "LOGIN"}</Button>
          )}
          <Link href="/">
            <IconButton>
              <Home color="primary" />
            </IconButton>
          </Link>
          {user && (
            <>
              <Text weight={400}>Hi, {user.user_metadata.full_name}</Text>
            </>
          )}
        </Navbar>
      </>
    </>
  );
};

export default Nav;
