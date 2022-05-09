import styled from "styled-components";

const CommentWrapper = styled.article`
  width: 100vw;
  position: relative;
  max-width: 800px;
  background: #f7f7f7;
  min-height: 100vh;
  padding: 10px;
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 5px;
  box-shadow: 0 2.8px 2.2px rgba(206, 204, 204, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028),
    0 12.5px 10px rgba(0, 0, 0, 0.035), 0 22.3px 17.9px rgba(0, 0, 0, 0.042), 0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
  margin-bottom: 50px;

  // applies curvy background to comment
  ::before {
    content: "";
    background: #091241;
    width: 100vw;
    max-width: 800px;
    height: 160px;
    position: absolute;
    top: 0;
    left: 50%;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
    transform: translateX(-50%);
    opacity: 0.9;
  }

  > * {
    z-index: 2;
  }
`;

export default CommentWrapper;
