import { Card } from "@mui/material";
import React from "react";

type MyChatProps = {
  children: React.ReactNode;
};

const MyChat: React.FC<MyChatProps> = (props) => {
  const { children } = props;
  return (
    <div className=" w-full flex justify-end mb-3">
      <div className="w-auto bg-slate-100 rounded-xl p-2">{children}</div>
    </div>
  );
};
export default MyChat;
