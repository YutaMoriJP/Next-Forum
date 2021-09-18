import Link from "../../styles/Link";
//why add a div? it's to follow the philosophy of 'single source of style' from Josh Comeau
import IconWrapper from "../../styles/IconWrapper";

interface IconComponentProps {
  txt: string;
  Icon: React.ReactNode;
  href: string;
}

const IconComponent = ({ href, txt, Icon }: IconComponentProps) => {
  return (
    <IconWrapper>
      <Link href={href} target="_blank" rel="noreferrer">
        <span className="tooltiptext">{txt}</span>
        {Icon}
      </Link>
    </IconWrapper>
  );
};

export default IconComponent;
