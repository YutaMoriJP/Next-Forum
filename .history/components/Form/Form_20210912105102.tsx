import Input from "./Input";
import useToggle from "./useHooks/useToggle";
import { useState } from "react";
//used for typing
import Fuse from "fuse.js";
import FormSkelton from "./styles/FormSkelton";
import Result from "./Result";

interface FormProps {
  users: Res[];
  loaded: boolean;
}
type State =
  | { result: null; completed: false }
  | { result: Fuse.FuseResult<Res>; completed: true };

const Form = ({ users, loaded }: FormProps) => {
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
    //lazily import fuse module, so that bundle is only downloaded when user trigger onSubmit handler
    const Fuse = (await import("fuse.js")).default;
    //const fuse = new Fuse(users, { keys: ["firstName"] });
    //users is passed as a prop from the <Users/> component
    //so both <Form/> and <Data/> renders data AFTER <Users/> has finished fetching users data
    //keys array tells fuse what object key to search from
    const fuse = new Fuse(users, { keys: ["firstName", "lastName"] });
    //search function returns an array, extract the element in index 0, which is the closest match
    //if no match is found, an empty array is returned, then result will point at undefined
    const [result] = fuse.search(search as string);
    //sets result and updates completed to true
    setResult({ result, completed: true });
    //clear input field
    toggle();
  };
  return (
    <section>
      {/*if loaded is false, then the necessary user data is not fetched yet, so render <Skelton/>*/}
      {!loaded && <FormSkelton />}
      {/*if loaded is true, user data is fetched, and form can be safely rendered */}
      {loaded && (
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
      )}
      {completed && <Result result={result!} />}
    </section>
  );
};

export default Form;
