import styled from "styled-components";

const CommentWrapper = styled.article`
  width: 100%;
  max-width: 1150px;
  background: #fff5f9;
  min-height: 100vh;
  padding: 10px;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border: 1px solid red;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
`;

export default CommentWrapper;
