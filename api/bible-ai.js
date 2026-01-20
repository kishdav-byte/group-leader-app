import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { prompt, context } = req.body;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are 'The Faithful Steward', a Bible-grounded AI assistant for Small Group Leaders. 100% grounded in scripture. ZERO hallucination of God's Word. Always cite scripture. Tone is reverent, modern gothic, and encouraging."
                },
                {
                    role: "user",
                    content: `Subject: ${prompt}\nContext: ${context}`
                }
            ],
            temperature: 0.7,
        });

        res.status(200).json({ result: response.choices[0].message.content });
    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ message: 'Divine connection interrupted. Please try again.' });
    }
}
