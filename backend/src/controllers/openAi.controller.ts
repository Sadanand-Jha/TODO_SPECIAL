import { Response, Request } from "express";
// import {OpenAI} from "openai"; // use named imports
// import ApiResponse from "../utils/apiResponse.ts";
import axios from "axios";



// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


const HF_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";

async function meow(req: Request, res: Response) {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No text provided" });

  try {
    const prompt = `Suggest 3 helpful todo items based on this partial input: "${text}". Keep them short and natural.`;

    const hfResponse = await axios.post(
      `https://api-inference.huggingface.co/models/${HF_MODEL}`,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Hugging Face responses vary slightly by model
    const rawOutput =
      hfResponse.data?.[0]?.generated_text || hfResponse.data?.generated_text || "";
    const suggestions = rawOutput
      .split("\n")
      .filter(Boolean)
      .map((s: string) => s.replace(/^\d+\.\s*/, "").trim())
      .slice(0, 3);

    res.json({ suggestions });
  } catch (err: any) {
    console.error("HF suggestion error:", err.response?.data || err.message);
    res.status(500).json({ error: "AI suggestion failed" });
  }
};

export default meow