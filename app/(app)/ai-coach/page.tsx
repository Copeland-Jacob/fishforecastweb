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
    <main className="lg:w-[calc(100vw-55px)] w-full h-[calc(100vh-20px)] bg-[#0C1F2D] flex flex-row">
      <div className=" absolute lg:bottom-3 ml-1 w-full flex flex-row gap-px sm:bottom-3 bottom-18 ">
        <input
          placeholder="Type your questions here!"
          value={query}
          className="pl-3 w-[90%] h-12 rounded-xl bg-[#132d3b] hover:bg-[#193b4d] text-white outline-none trasnition duration-300"
          onChange={(e) => setQuery(e.target.value)}
        />

        {query !== "" && (
          <div
            onClick={handleSubmit}
            className="w-1/12 h-[calc(100vw-11/12)] rounded-full bg-[#224d64] hover:bg-[#316582] flex items-center group transition-all mx-auto"
          >
            <Send className="mx-auto" />
          </div>
        )}
        {query === "" && (
          <div className="w-1/12 h-[calc(100vw-11/12)] rounded-full bg-[#224d64] flex items-center group transition-all mx-auto">
            <Send className="mx-auto text-gray-400" />
          </div>
        )}
      </div>

      <div className="flex flex-col overflow-y-scroll lg:h-[82%] sm:h-[82%] h-[73%]">
        {messages.map((message: any, index: any) =>
          message.sender === "user" ? (
            <div key={index} className="flex justify-end mt-5 mx-5">
              <div className="max-w-[45%] w-fit p-3 bg-[#EAF2F8] rounded-xl">
                <p className="text-[#0B1F2A]">{message.message}</p>
              </div>
            </div>
          ) : (
            <div key={index} className="flex justify-start mt-5 mx-5">
              <div className="max-w-[45%] w-fit p-3 bg-[#1B3A4B] rounded-xl">
                <p className="text-[#E6F4F1]">{message.message}</p>
              </div>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
