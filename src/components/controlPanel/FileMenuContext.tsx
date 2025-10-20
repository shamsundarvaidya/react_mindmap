import { createContext, useContext } from "react";

export type FileMenuContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
  menuRef: React.RefObject<HTMLDivElement | null>;
};

export const FileMenuContext = createContext<FileMenuContextValue | null>(null);

export const useFileMenu = () => {
  const ctx = useContext(FileMenuContext);
  if (!ctx) {
    throw new Error("FileMenu subcomponents must be used within <FileMenu />");
  }
  return ctx;
};
