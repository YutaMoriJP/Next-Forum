import { useCallback, useState } from "react";

const useInput = <T extends HTMLInputElement & HTMLTextAreaElement>(
  initial: string = ""
) => {
  const [value, setValue] = useState(initial);
  const onChange = (event: React.ChangeEvent<T>) =>
    setValue(event.currentTarget.value);
  const reset = useCallback(() => setValue(initial), [initial]);

  return [{ value, onChange }, reset] as const;
};

export default useInput;
