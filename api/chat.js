import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(request, response) {
  try {
    const { userQuery } = await request.body;

    if (!userQuery) {
      return response.status(400).json({ error: "Missing user query." });
    }

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(userQuery);
    const apiResponse = result.response.text();

    response.status(200).json({ text: apiResponse });
  } catch (error) {
    console.error("API Error:", error);
    response.status(500).json({ error: "An error occurred." });
  }
}

