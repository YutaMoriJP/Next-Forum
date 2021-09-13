import StyledButton from "../../styles/Button";
interface ButtonProps {
  children: string;
}
const Button = ({ children }: ButtonProps) => {
  return <StyledButton>{children}</StyledButton>;
};

export default Button;
