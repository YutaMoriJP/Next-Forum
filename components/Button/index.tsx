import StyledButton from "../../styles/Button";

interface ButtonProps {
  children: string;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
