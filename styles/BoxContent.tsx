import styled from "styled-components";

const BoxContent = styled.div`
  display: flex;
  padding: 10px 0;
  flex-direction: column;
  line-height: 30px;
  > * {
    margin: 5px;
  }
  //helps to correctly position markup list like *One or 1. first
  list-style-position: inside;
  blockquote {
    border-left: 3px solid grey;
    padding: 15px;
    background: #eee;
    border-radius: 5px;
    p {
      padding: 5px;
    }
  }
  code {
    background: #e4e4e4;
  }
`;

export default BoxContent;
