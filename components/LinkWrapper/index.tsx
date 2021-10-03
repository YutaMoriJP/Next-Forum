import Link from "next/link";

type LinkWrapperProps = {
  children: React.ReactNode;
  href: string;
  onClick: () => void;
};

const LinkWrapper = ({ href, onClick, children }: LinkWrapperProps) => (
  <Link href={href}>
    <span onClick={onClick}>{children}</span>
  </Link>
);

export default LinkWrapper;
