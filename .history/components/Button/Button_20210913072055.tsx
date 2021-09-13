import StyledButton from "../../styles/Button";
interface ButtonProps {
  children: string;
  [props: string]: any;
}
const Button = ({ children }: ButtonProps) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
