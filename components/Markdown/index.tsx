import ReactMarkDown from "react-markdown";

import styled from "styled-components";

const StyledMarkdown = styled(ReactMarkDown)`
  > * {
    overflow-x: scroll;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0.8rem 0;
  }
  pre {
    overflow: scroll;
    max-width: 90%;
    border: 1px solid grey;
    padding: 5px;
  }
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
    padding: 2px;
    font-size: 0.8rem;
    line-height: 0;
  }
  img {
    width: 80%;
    max-width: 200px;
  }
`;

type MarkdownProps = { children: React.ReactNode | string; main?: boolean };

const Markdown = ({ children }: MarkdownProps) => {
  return (
    <>
      <StyledMarkdown>{children}</StyledMarkdown>
    </>
  );
};

export default Markdown;
