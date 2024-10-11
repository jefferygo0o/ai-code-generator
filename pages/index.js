import { useState } from 'react';

export default function Home() {
    const [command, setCommand] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to handle form submission and call the API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ command }),
            });

            const data = await response.json();
            setGeneratedCode(data.code);
        } catch (error) {
            console.error('Error fetching generated code:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial' }}>
            <h1>AI Code Generator</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Describe the app you want to create..."
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    rows={4}
                    style={{ width: '100%', padding: '10px' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px', marginTop: '10px' }}>
                    {loading ? 'Generating...' : 'Generate Code'}
                </button>
            </form>

            {generatedCode && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Generated Code:</h2>
                    <pre
                        style={{
                            backgroundColor: '#f4f4f4',
                            padding: '10px',
                            borderRadius: '5px',
                        }}
                    >
                        {generatedCode}
                    </pre>
                </div>
            )}
        </div>
    );
}
