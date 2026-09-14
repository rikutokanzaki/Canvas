import { CSSProperties, HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  color?: string;
};

export const MaskingTape = ({ color = "rgba(253, 224, 71, 0.6)", ...props }: Props) => {
  const combinedStyle: CSSProperties = {
    backgroundColor: color,
    ...props.style,
  };

  return (
    <div
      {...props}
      aria-hidden="true"
      className={`absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-2 border-r border-l border-dashed border-black/10 shadow-[0_1px_2px_rgba(0,0,0,0.05)] ${props.className || ""}`}
      style={combinedStyle}
    />
  );
};
