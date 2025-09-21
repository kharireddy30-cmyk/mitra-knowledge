export default async function handler(request, response) {
  try {
    const { userQuery } = request.body;

    if (!userQuery) {
      return response.status(400).json({ error: "Missing user query." });
    }

    const huggingfaceApiUrl = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2";
    const huggingfaceApiKey = process.env.HUGGINGFACE_API_KEY;

    const apiResponse = await fetch(huggingfaceApiUrl, {
      headers: {
        "Authorization": `Bearer ${huggingfaceApiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        inputs: userQuery,
      }),
    });

    if (!apiResponse.ok) {
      throw new Error(`Hugging Face API error: ${apiResponse.statusText}`);
    }

    const result = await apiResponse.json();
    const generatedText = result[0].generated_text;

    response.status(200).json({ text: generatedText });
  } catch (error) {
    console.error("API Error:", error);
    response.status(500).json({ error: "An error occurred." });
  }
}
