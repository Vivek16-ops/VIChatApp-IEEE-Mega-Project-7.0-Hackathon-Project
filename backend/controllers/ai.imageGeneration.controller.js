import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function ImageGeneration(prompt) {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
    });
    return response.data[0].url
}

export const aiImageGenerationAPI = async (req, res) => {
    try {
        const { prompt } = await req.body
        const response = await ImageGeneration(prompt);
        return res.json({ success: true, AIGeneratedImageUrl: response })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}