import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

export default async function handler(request, response) {
  try {
    const { userQuery } = request.body;

    if (!userQuery) {
      return response.status(400).json({ error: "Missing user query." });
    }

    const result = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: userQuery,
    });
    
    const generatedText = result.generated_text;

    response.status(200).json({ text: generatedText });
  } catch (error) {
    console.error("API Error:", error);
    response.status(500).json({ error: "An error occurred." });
  }
}

