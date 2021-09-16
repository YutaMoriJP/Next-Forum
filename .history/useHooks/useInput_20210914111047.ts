import { useCallback, useState } from "react";

const useInput = (initial: string = "") => {
  const [value, setValue] = useState(initial);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.currentTarget.value);
  const reset = useCallback(() => setValue(initial), [initial]);

  return [{ value, onChange }, reset] as const;
};

export default useInput;
