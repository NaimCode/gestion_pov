import React from "react";

type DividerProps = {
  children?: React.ReactNode;
  color?: string;
};
const Divider = ({ children, color }: DividerProps) => {
  return (
    <div className={`flex flex-row gap-2 w-full items-center`}>
      <hr
        className={`flex-grow ${
          color ? `bg-[${color}]` : ""
        } h-1 translate-y-1`}
      />
      {children}
      <hr
        className={`flex-grow ${
          color ? `bg-[${color}]` : ""
        } h-1 translate-y-1`}
      />
    </div>
  );
};

export default Divider;
