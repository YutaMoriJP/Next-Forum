interface ButtonProps {
  children: string;
}
const Button = ({ children }) => {
  return <button>{children}</button>;
};

export default Button;
