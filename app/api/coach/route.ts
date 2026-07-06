import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content:
                `You are an expert fishing coach named Fin. Give helpful, friendly tips based on user questions about fishing gear, technique, or species. Keep it somewhat short, and refrain from using any bold or underline, just straight, normal text. The user is already aware of the following: ${body.context} `,
            },
            {
              role: "user",
              content: body.message,
            },
          ],
          temperature: 0.7,
        }),
      },
    );
``
    const data = await response.json();

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
