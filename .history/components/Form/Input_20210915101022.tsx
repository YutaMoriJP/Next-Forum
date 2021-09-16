import { useEffect } from "react";
import useInput from "../../useHooks/useInput";
import TextField from "../../styles/Input";
import TextArea from "../../styles/TextArea";

interface InputProps {
  id: string;
  name: string;
  onSubmitted: boolean;
  placeholder: string;
  label?: boolean;
  [data: string]: any;
}
const Input = ({
  id,
  name,
  onSubmitted,
  placeholder,
  label = false,
  {...rest}
}: InputProps) => {
  const [inputProps, reset] = useInput("");
  useEffect(() => {
    reset();
  }, [onSubmitted, reset]);
  return (
    <>
      {label && (
        <label htmlFor={id} style={{ fontWeight: 500, fontSize: "1rem" }}>
          {id}
        </label>
      )}
      <TextField
        type="text"
        name={name}
        aria-labelledby={id}
        id={id}
        placeholder={placeholder}
        {...inputProps}
      />
    </>
  );
};

export default Input;
