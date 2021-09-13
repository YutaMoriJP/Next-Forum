import styled from "styled-components";

const Comment = styled.article`
  width: 90%;
  max-width: 800px;
  padding: 20px 10px;
  margin: 10px;
  border-radius: 5px;
  align-self: flex-start;
  display: flex;
  border: 1px solid black;
  > * {
    margin: 5px;
  }
`;

export default Comment;
