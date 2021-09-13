import Input from "./Input";
import { useState } from "react";
import useToggle from "../../useHooks/useToggle";
//used for typing

const Form = () => {
  //used for clearing input field, after submit event is fired
  const { open, toggle } = useToggle();

  //stores result of fuse.js search
  const [{ result, completed }, setResult] = useState<State>({
    result: null,
    completed: false,
  });
  //dynamically import fuse module so async func.
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    //extract input value as { search: string }
    const { search } = Object.fromEntries(new FormData(event.currentTarget));

    toggle();
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          name="search"
          id="Search User"
          onSubmitted={open}
          placeholder="Search users from list..."
        />
      </form>
    </>
  );
};

export default Form;
