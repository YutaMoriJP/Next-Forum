import Link from "../../styles/Link";
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
