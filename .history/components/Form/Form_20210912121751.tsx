import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing
import Button from "../Button/Button";
import Right from "../../styles/Right";

const Form = (): JSX.Element => {
  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();
  //dynamically import fuse module so async func.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    //extract input value as { search: string }
    const inputFields = Object.fromEntries(new FormData(event.currentTarget));
    console.log("inputFields", inputFields);
    toggle();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name="comment"
          id="Search User"
          onSubmitted={open}
          placeholder="Search users from list..."
        />
      </form>
    </>
  );
};

export default Form;
