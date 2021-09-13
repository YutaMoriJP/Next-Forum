import { useEffect } from "react";
import useInput from "../../useHooks/useInput";
interface InputProps {
  id: string;
  name: string;
  onSubmitted: boolean;
  placholder: string;
  [data: string]: any;
}
const Input = ({ id, name, onSubmitted, placholder }: InputProps) => {
  const [inputProps, reset] = useInput("");
  useEffect(() => {
    reset();
  }, [onSubmitted, reset]);
  return (
    <>
      <label htmlFor={id}>{id}</label>
      <input
        type="text"
        name={name}
        id={id}
        placeholder={placholder}
        {...inputProps}
      />
    </>
  );
};

export default Input;
