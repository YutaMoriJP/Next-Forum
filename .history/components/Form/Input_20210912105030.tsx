import { useEffect } from "react";
import useInput from "../../useHooks/useInput";
interface InputProps {
  id: string;
  name: string;
  onSubmitted: boolean;
}
const Input = ({ id, name, onSubmitted }: InputProps) => {
  const [inputProps, reset] = useInput("");
  useEffect(() => {
    reset();
  }, [onSubmitted, reset]);
  return (
    <>
      <label htmlFor={id}>{id}</label>
      <input type="text" name={name} id={id} {...inputProps} />
    </>
  );
};

export default Input;
