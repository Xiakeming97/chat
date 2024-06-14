"use client";
import { useState, useEffect, useRef } from "react";
import { InputAdornment, OutlinedInput, Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { sendChat } from "@/services/sendChat";
import BotChat from "./common/BotChat";
import MyChat from "./common/MyChat";

type ChatsType = {
  message: string;
  type: "user" | "bot";
  id: number | string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState<ChatsType[]>([]);
  const [openKey, setOpenKey] = useState("");
  const messageID = useRef<number>(1);
  const ChatRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    console.log(message);
    setMessage("");
    setChats((prev) => [
      ...prev,
      {
        message,
        type: "user",
        id: messageID.current,
      },
    ]);
    try {
      setIsLoading(true);
      const text = await sendChat([
        ...chats,
        {
          message,
          type: "user",
          id: messageID.current,
        },
      ]);
      setChats((prev) => [
        ...prev,
        {
          message: text.choices[0].message.content,
          type: "bot",
          id: text.id,
        },
      ]);
      console.log(text);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
      messageID.current += 1;
    }
  };

  useEffect(() => {
    setOpenKey(localStorage.getItem("OPENROUTER_API_KEY") || "");
  }, []);

  useEffect(() => {
    // 每次 chats 更新时滚动到底部
    if (ChatRef.current) {
      ChatRef.current.scrollTop = ChatRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <main className="w-full h-screen flex">
      <div className="w-80 h-full bg-slate-100 p-3 max-sm:hidden">
        <OutlinedInput
          id="outlined-basic"
          fullWidth
          multiline
          rows={4}
          placeholder="请填写Key"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            localStorage.setItem("OPENROUTER_API_KEY", event.target.value);
            setOpenKey(event.target.value);
          }}
          value={openKey}
        />
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-4xl sm:w-full h-full flex flex-col">
          <div
            className="flex-1 overflow-auto felx flex-col p-3"
            ref={ChatRef}
          >
            {chats.map((item, index) => {
              return (
                <>
                  {item.type === "user" ? (
                    <MyChat key={index}>{item.message}</MyChat>
                  ) : (
                    <BotChat key={index}>{item.message}</BotChat>
                  )}
                </>
              );
            })}
          </div>
          <div className="w-full p-3">
            <OutlinedInput
              id="outlined-basic"
              fullWidth
              multiline
              maxRows={6}
              placeholder={`给"Chat"发信息`}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    size="medium"
                    disabled={isLoading || message.length < 1}
                    onClick={sendMessage}
                  >
                    <ArrowUpwardIcon />
                  </Button>
                </InputAdornment>
              }
              value={message}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMessage(event.target.value || "");
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
