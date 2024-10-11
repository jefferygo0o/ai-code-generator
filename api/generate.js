// Import the OpenAI library
import OpenAI from 'openai';

// Initialize OpenAI client with the API key from environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure the API key is set in your Vercel environment variables
});

// API route handler for code generation
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { command } = req.body;

        try {
            // Call OpenAI to generate code based on the user's command
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo', // You can also use 'gpt-4' if your plan supports it
                messages: [{ role: 'user', content: command }],
                max_tokens: 300,
                temperature: 0.5,
            });

            const generatedCode = response.choices[0].message.content.trim();
            res.status(200).json({ code: generatedCode });
        } catch (error) {
            console.error('Error generating code:', error); // Log the error for debugging
            res.status(500).json({ error: error.message || 'Error generating code' });
        }
    } else {
        // If the request is not a POST, return a 405 error
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
