// কোনো থার্ড-পার্টি ফ্রেমওয়ার্ক (যেমন: Express) ছাড়া র (Raw) Node.js দিয়ে বেসিক ওয়েব সার্ভার তৈরি।

const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // হেডার সেটিং
    res.setHeader('Content-Type', 'application/json');

    // বেসিক রাউটিং
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Welcome to Raw Node.js HTTP Server!' }));
    } else if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({ status: 'success', users: ['Rahim', 'Karim', 'John'] }));
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Route Not Found' }));
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});