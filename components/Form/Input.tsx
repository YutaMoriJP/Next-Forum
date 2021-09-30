import { useEffect, useRef } from "react";
import TextField from "../../styles/Input";

interface InputProps extends React.ComponentProps<"input"> {
  id: string;
  name: string;
  placeholder: string;
  onSubmitted?: boolean; //if input state is manated by parent component, then this isn't needed as parent can clear input field
  label?: boolean;
  [data: string]: any;
}
const Input = ({
  id, //used for connecting label to input
  name, //used to fetch input value from <Form/>
  onSubmitted, //runs if user submits form
  placeholder,
  label = false, //sometimes we don't want a label
  ...rest //used to pass other attributes, like value/onChange to make parent manage Input state
}: InputProps): JSX.Element => {
  //if value is not a state managed by React, there needs to be a way to clear input field
  //ref.current.value = '' takes care of it, which is done in the useEffect hook
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    //clears input field if there the value state is not managed by the input field
    inputRef.current.value = "";
  }, [onSubmitted]);
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
        id={id}
        placeholder={placeholder}
        ref={inputRef}
        //rest usually accepts value&onChange to manage input state, or aria attributes for accessibility
        {...rest}
      />
    </>
  );
};

export default Input;
