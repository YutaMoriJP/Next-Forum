import Link from "../../styles/Link";
//why add a div? it's to follow the philosophy of 'single source of style' from Josh Comeau
import IconWrapper from "../../styles/IconWrapper";
import styled from "styled-components";

const IconComponentWrapper = styled.article`
  text-decoration: 0;
  color: ${props => props.color || "white"};
  position: relative;
  margin: 0;
  .tooltiptext {
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 6px;
    position: absolute;
    z-index: 1;
    font-size: 0.8rem;
    width: fit-content;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
  :hover .tooltiptext {
    visibility: visible;
  }
`;

interface IconComponentProps {
  txt: string;
  Icon: React.ReactNode;
}

interface IoncLinkComponent extends IconComponentProps {
  href: string;
}

export const IconComponent = ({
  Icon,
  txt,
}: IconComponentProps): JSX.Element => {
  return (
    <IconComponentWrapper>
      {Icon}
      <span className="tooltiptext">{txt}</span>
    </IconComponentWrapper>
  );
};

const IconLinkComponent = ({
  href,
  txt,
  Icon,
}: IoncLinkComponent): JSX.Element => {
  return (
    <IconWrapper>
      <Link href={href} target="_blank" rel="noreferrer">
        <span className="tooltiptext">{txt}</span>
        {Icon}
      </Link>
    </IconWrapper>
  );
};

export default IconLinkComponent;
