import { useEffect, useRef } from "react";
import TextField from "../../styles/Input";

import type { MutableRefObject } from "react";

interface InputProps extends React.ComponentProps<"input"> {
  id: string;
  labelText?: string;
  name: string;
  placeholder: string;
  onSubmitted?: boolean; // if input state is managed by parent component, then this isn't needed as parent can clear input field
  label?: boolean;
  [data: string]: any;
}
const Input = ({
  id, // used for connecting label to input
  labelText,
  name, // used to fetch input value from <Form/>
  onSubmitted, // runs if user submits form
  placeholder,
  label = false, // sometimes we don't want a label
  ...rest // used to pass other attributes, like value/onChange to make parent manage Input state
}: InputProps) => {
  // if value is not a state managed by React, there needs to be a way to clear input field
  // ref.current.value = '' takes care of it, which is done in the useEffect hook
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const input = inputRef.current;

    return () => {
      // this will not run in initial mounting phase, avoids unintentionally clearing up value field
      // like in the <Update/> component, value has default string, and it should not be cleared when input mounts
      // clears input field if the value state is not managed by the input field
      if (input) input.value = "";
    };
  }, [onSubmitted]);

  return (
    <>
      {label && (
        <label htmlFor={id} style={{ fontWeight: 500, fontSize: "1rem" }}>
          {labelText}
        </label>
      )}

      <TextField {...rest} name={name} id={id} placeholder={placeholder} ref={inputRef} />
    </>
  );
};

export default Input;
