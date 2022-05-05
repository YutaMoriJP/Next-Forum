import StyledButton from "../../styles/Button";

interface ButtonProps extends Omit<React.ComponentProps<"button">, "children"> {
  children: string;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
