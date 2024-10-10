document.getElementById('sendButton').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;
    await generateAppCode(userInput);
    document.getElementById('userInput').value = '';
});

async function generateAppCode(command) {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command })
    });

    if (!response.ok) {
        const error = await response.json();
        alert(`Error: ${error.error}`);
        return;
    }

    const data = await response.json();
    
    document.getElementById('codeOutput').innerText = data.code;

    const iframe = document.getElementById('appOutput');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Generated App</title>
        </head>
        <body>
            <script>
                ${data.code}
            <\/script>
        </body>
        </html>
    `);
    iframeDoc.close();
}
