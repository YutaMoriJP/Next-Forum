import styled from "styled-components";

const Icon = styled.section`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background: ${props =>
    props.count ? `var(--color-${props.count})` : "black"};
  flex: 0 0 auto !important;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

export default Icon;
