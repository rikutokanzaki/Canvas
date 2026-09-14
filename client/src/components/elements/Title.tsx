import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
}

export const Title = ({ children, ...props }: Props) => {
  return (
    <h1 className="pb-2 text-2xl" {...props}>
      {children}
    </h1>
  );
}
