import StyledButton from "../../styles/Button";
interface ButtonProps {
  children: string;
  [props: string]: any;
}
const Button = ({ children, ...rest }: ButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
