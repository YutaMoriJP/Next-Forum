import { useCallback, useState } from "react";

const useToggle = <T>(initial: boolean | Function = false) => {
  const [open, setOpen] = useState(
    typeof initial === "function" ? initial() : initial
  );
  const toggle = useCallback((): void => setOpen(prevOpen => !prevOpen), []);
  const onOpen = useCallback((): void => setOpen(true), []);
  const onClose = useCallback((): void => setOpen(false), []);
  return {
    open,
    toggle,
    onOpen,
    onClose,
  };
};

export default useToggle;
