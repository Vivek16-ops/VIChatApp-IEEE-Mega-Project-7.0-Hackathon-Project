import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// AI Function 
let messages = []
let finalAIResponse = "";
async function main(prompt) {
    let newItem = { "role": "user", "content": prompt }
    if (messages.length > 0 && messages[messages.length - 1].content === newItem.content) {
        return null;
    }
    messages.push(newItem)
    const completion = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
    });

    return completion.choices[0].message.content
}

//AI Functionality API
export const aiComposerAPI = async (req, res) => {
    try {
        const { work } = await req.body
        const response = await main(work);
        if (response !== null) {
            finalAIResponse = response
        }
        return res.json({ success: true, AIResponse: finalAIResponse })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}