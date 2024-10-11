const { OpenAI } = require('openai');

// Initialize OpenAI client with the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in Vercel
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        if (!command) {
            return res.status(400).json({ error: 'No command provided' });
        }

        try {
            // Call OpenAI to generate code based on the user's command
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: command }],
                max_tokens: 300,
                temperature: 0.5,
            });

            const generatedCode = response.choices[0].message.content.trim();
            res.status(200).json({ code: generatedCode });
        } catch (error) {
            console.error('Error generating code:', error); // Log the error
            res.status(500).json({ error: error.message || 'Error generating code' });
        }
    } else {
        // If the request is not a POST, return a 405 error
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
