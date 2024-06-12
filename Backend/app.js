const express = require('express');
const app = express();
const port = 3001;

// API endpoint without CORS headers
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});

app.get('/api/authenticate', (req, res) => {
    console.log("Received...");
    setTimeout(() => {
        console.log("Responding...");
        // res.json({ status: 200, token: '1234567890' });
        res.json({ status: 403 });
    }, 5000);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
