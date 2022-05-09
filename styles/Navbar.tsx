import styled from "styled-components";

const Navbar = styled.nav`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;

  // creates small space for last element in navbar icons
  > *:nth-last-child(1) {
    margin-right: 0.5rem;
  }
`;

export default Navbar;
