import { useCallback, useState } from "react";

const useToggle = (initial = false) => {
  const [open, setOpen] = useState(initial);
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
