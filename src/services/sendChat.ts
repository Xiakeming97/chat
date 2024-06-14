// const OPENROUTER_API_KEY = "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";
type ChatsType = {
  message: string;
  type: "user" | "bot";
  id: number | string;
};
async function sendChat(message: ChatsType[]) {
  const OPENROUTER_API_KEY =
    localStorage.getItem("OPENROUTER_API_KEY") ||
    "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";
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": `https://openrouter.ai/activity?api_key_id=352068`, // Optional, for including your app on openrouter.ai rankings.
        "X-Title": `ChatKey`, // Optional. Shows in rankings on openrouter.ai.
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gryphe/mythomist-7b:free",
        messages: message.map((item) => {
          return {
            role: item.type,
            content: item.message,
          };
        }),
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export { sendChat };
