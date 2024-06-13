const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001', // React app URL
    credentials: true
}));

const loggedInUsersCache = {

};

app.get('/api/data', (req, res) => {
    const sessionId = req?.cookies?.JSESSIONID;

    console.log("Hello", loggedInUsersCache[sessionId]);

    res.json({ message: 'Hello from the server!' });
});

let n = 0;

app.post('/api/authenticate', (req, res) => {

    const reqSessionId = req?.cookies?.JSESSIONID;
    console.log("Received...", reqSessionId);

    if (loggedInUsersCache[reqSessionId]) {
        res.json({ status: 200, token: '1234567890' });
        return
    }


    // Do some logging in logic 

    let sessionId = 'ABC' + n;
    n++;

    loggedInUsersCache[sessionId] = "Nikolas";

    res.cookie('JSESSIONID', sessionId, {
        httpOnly: true,
        secure: false, // Set to true if using HTTPS
        sameSite: 'strict'
    });

    res.json({ status: 200, token: '1234567890' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
