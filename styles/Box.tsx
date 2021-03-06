import styled from "styled-components";

const Box = styled.article`
  background: #f7f7f7;
  border-radius: 6px;
  width: 100%;
  max-width: 800px;
  padding: 10px 25px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05), 0 100px 80px rgba(0, 0, 0, 0.07);

  @media screen and (max-width: 800px) {
    border-radius: 0;
  }
`;

export default Box;
