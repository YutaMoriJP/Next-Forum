import { useEffect } from "react";
import useInput from "../../useHooks/useInput";
interface InputProps {
  id: string;
  name: string;
  onSubmitted: boolean;
  placeholder: string;
  [data: string]: any;
}
const Input = ({ id, name, onSubmitted, placeholder }: InputProps) => {
  const [inputProps, reset] = useInput("");
  useEffect(() => {
    reset();
  }, [onSubmitted, reset]);
  return (
    <>
      <input
        type="text"
        name={name}
        aria-labelledby={id}
        placeholder={placeholder}
        {...inputProps}
      />
    </>
  );
};

export default Input;
