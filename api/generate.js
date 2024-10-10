const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Set your OpenAI API Key in Vercel environment variables
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: command }],
                max_tokens: 300,
                temperature: 0.5,
            });

            const generatedCode = response.choices[0].message.content.trim();
            res.status(200).json({ code: generatedCode });
        } catch (error) {
            console.error('Error generating code:', error);
            res.status(500).json({ error: 'Error generating code' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
