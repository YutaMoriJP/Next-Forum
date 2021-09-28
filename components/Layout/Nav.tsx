import { useAuth } from "../../store/AuthContext";
import Navbar from "../../styles/Navbar";
import Text from "../../styles/Text";
import IconWrapper from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockCloseIcon from "@material-ui/icons/Lock";
import { IconComponent } from "../Icon";
import getUsername from "../../util/getUsername";

const IconButton = styled(IconWrapper)`
  pointer-events: ${(props: { pointerEvent: string }) =>
    props.pointerEvent || "auto"};
`;
const HomeIcon = styled(Home)`
  color: ${(props: { color: string }) => props.color || "purple"};
`;

interface NavProps {
  CreateThread: React.ReactNode;
}

const Nav = ({ CreateThread }: NavProps): JSX.Element => {
  const { login, logout, authReady, user } = useAuth();
  const { asPath } = useRouter(); //used to check the current route
  console.log("user", user);
  console.log("authReady", authReady);
  //used to disable <Link/> when already at '/' route, so that <Home/> isn't unnecessarily rendered
  const disableIconButton = asPath === "/" ? "none" : "auto";
  //changes icon color to grey if button is disabled
  const disableHomeButton = asPath === "/" ? "grey" : "#4926b4";
  const handleClick = (): void => {
    if (user) {
      //if user is logged in, then logout should be called
      logout();
    } else {
      //if user is not logged in, then login should be called
      login();
    }
  };
  return (
    <>
      <>
        <Navbar>
          {CreateThread}
          {/* allows user to navigate back to homepage*/}
          <IconComponent
            txt="HOME"
            Icon={
              <Link href="/">
                <IconButton pointerEvent={disableIconButton}>
                  <HomeIcon color={disableHomeButton} aria-label="Home Icon" />
                </IconButton>
              </Link>
            }
          />
          <IconComponent
            txt={user ? "LOGOUT" : "LOGIN"}
            Icon={
              <IconWrapper onClick={handleClick}>
                {user ? (
                  <LockCloseIcon style={{ color: "#4926b4" }} />
                ) : (
                  <LockOpenIcon style={{ color: "#4926b4" }} />
                )}
              </IconWrapper>
            }
          />
          {user && (
            <>
              {/* the getUsername function receives the user object and returns the formatted username */}
              <Text weight={600}>Hi, {getUsername(user)}</Text>
            </>
          )}
        </Navbar>
      </>
    </>
  );
};

export default Nav;
