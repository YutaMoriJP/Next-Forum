import { useAuth } from "../../store/AuthContext";
import Navbar from "../../styles/Navbar";
import Text from "../../styles/Text";
import IconWrapper from "@material-ui/core/IconButton";
import Home from "@material-ui/icons/Home";
import { useRouter } from "next/router";
import styled from "styled-components";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockCloseIcon from "@material-ui/icons/Lock";
import { IconComponent } from "../Icon";
import getUsername from "../../util/getUsername";
import LinkWrapper from "../LinkWrapper";
import OverlayLoading from "../Loading";
import { Message } from "kantan-components";

const IconButton = styled(IconWrapper)`
  pointer-events: ${(props: { pointerEvent: string }) => props.pointerEvent || "auto"};
`;
const HomeIcon = styled(Home)`
  color: ${(props: { color: string }) => props.color || "purple"};
`;

interface NavProps {
  CreateThread: React.ReactNode;
  showLoading: boolean;
  startLoading: () => void;
}

const Nav = ({ CreateThread, showLoading, startLoading }: NavProps): JSX.Element => {
  const { login, logout, authReady, user, open, onClose, message } = useAuth();

  const { asPath } = useRouter(); //used to check the current route
  console.log("user", user);
  console.log("authReady", authReady);

  const isHome = asPath === "/";

  //used to disable <Link/> when already at '/' route, so that <Home/> isn't unnecessarily rendered
  const disableIconButton = isHome ? "none" : "auto";
  //changes icon color to grey if button is disabled
  const disableHomeButton = isHome ? "grey" : "#4926b4";

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
      {/* loading animation when user navigates back to homepage */}
      {showLoading ? <OverlayLoading fixed={true} /> : null}
      <Navbar>
        {/*component that allows users to create new post *, passed from _app.tsx -> Layout -> Nav */}
        {CreateThread}

        {/* allows user to navigate back to homepage*/}
        <IconComponent
          txt="HOME"
          Icon={
            <LinkWrapper onClick={asPath === "/" ? () => null : startLoading} href="/">
              <IconButton pointerEvent={disableIconButton} aria-label="Home Icon">
                <HomeIcon color={disableHomeButton} />
              </IconButton>
            </LinkWrapper>
          }
        />
        {/*login/logout option*/}
        <IconComponent
          txt={user ? "LOGOUT" : "LOGIN"}
          Icon={
            <IconWrapper
              onClick={handleClick}
              style={{ position: "relative" }}
              aria-label={user ? "Log out" : "Log in"}
            >
              {user ? (
                <>
                  <LockCloseIcon style={{ color: "#4926b4" }} />
                  {open ? (
                    <Message ms={1000} onClose={onClose} fixed={true} color="#5f3dc4">
                      {message}
                    </Message>
                  ) : null}
                </>
              ) : (
                <>
                  <LockOpenIcon style={{ color: "#4926b4" }} />
                  {open ? (
                    <Message ms={1000} onClose={onClose} fixed={true} color="#5f3dc4">
                      {message}
                    </Message>
                  ) : null}
                </>
              )}
            </IconWrapper>
          }
        />
        {/* only logged in users will receive greeting */}
        {user && (
          <>
            {/* the getUsername function receives the user object and returns the formatted username */}
            <Text weight={600}>Hi, {getUsername(user)}</Text>
          </>
        )}
      </Navbar>
    </>
  );
};

export default Nav;
