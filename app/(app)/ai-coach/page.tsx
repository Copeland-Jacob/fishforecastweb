"use client";
import { Send } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<any>([]);

  const handleSubmit = async () => {
    setMessages((prev: any) => [...prev, { sender: "user", message: query }]);
    console.log(query);
    const res = await fetch("/api/coach", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: query }),
    });

    const data = await res.json();
    const newMessage = data.data.choices[0].message.content;
    console.log(newMessage);
    setMessages((prev: any) => [
      ...prev,
      { sender: "ai", message: newMessage },
    ]);
    setQuery("");
  };

  return (
    <main className="w-full h-full bg-[#0C1F2D] flex flex-col overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto py-4">
        {messages.map((message: any, index: any) =>
          message.sender === "user" ? (
            <div key={index} className="flex justify-end mb-5 mx-5">
              <div className="max-w-[80%] w-fit p-3 bg-[#EAF2F8] rounded-xl">
                <p className="text-[#0B1F2A]">{message.message}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start mb-5 mx-5">
              <div className="max-w-[80%] w-fit p-3 bg-[#1B3A4B] rounded-xl">
                <p className="text-[#E6F4F1]">{message.message}</p>
              </div>
            </div>
          ),
        )}
      </div>

      {/* Input Area - Adjusted for mobile bottom nav */}
      <div className="p-3 border-t border-[#162A39] bg-[#0C1F2D] pb-20 sm:pb-3">
        <div className="flex flex-row gap-2 max-w-4xl mx-auto items-center">
          <input
            placeholder="Type your questions here!"
            value={query}
            className="flex-1 pl-3 h-12 rounded-xl bg-[#132d3b] hover:bg-[#193b4d] text-white outline-none transition duration-300"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            disabled={query === ""}
            onClick={handleSubmit}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              query !== ""
                ? "bg-[#224d64] hover:bg-[#316582] text-white"
                : "bg-[#224d64]/50 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
}
