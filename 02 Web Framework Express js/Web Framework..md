# Express.js Essentials Guide (Web Framework & API Development)

 
**বিষয়:** Express.js Routing, Request/Response, Middleware & Error Handling

---

## Overview
Express.js হলো Node.js-এর একটি জনপ্রিয়, ফ্লেক্সিবল এবং লাইটওয়েট **Web Application Framework**। এটি র (Raw) Node.js HTTP মডিউলের জটিলতা দূর করে সহজে RESTful API এবং ওয়েব অ্যাপ্লিকেশন তৈরি করতে সাহায্য করে।

---

## 1. Express Setup & Basic Routing

Express-এ রাউটিং ব্যবহার করে বিভিন্ন HTTP Method (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`) হ্যান্ডেল করা হয়।

### HTTP Methods-এর সংক্ষিপ্ত পরিচয়:
* `GET`: ডাটা রিড বা ক্যাচ করার জন্য।
* `POST`: নতুন ডাটা ক্রিয়েট করার জন্য।
* `PUT`: বিদ্যমান সম্পূর্ণ ডাটা আপডেট/রিপ্লেস করার জন্য।
* `PATCH`: ডাটার নির্দিষ্ট কিছু অংশ আংশিক (Partial) আপডেট করার জন্য।
* `DELETE`: ডাটা রিমুভ বা ডিলিট করার জন্য।

---

## 2. Request & Response Objects

ক্লায়েন্ট (যেমন: React, Postman, Mobile App) থেকে ডাটা পাঠানো এবং সার্ভার থেকে রেসপন্স দেওয়ার মূল মাধ্যম:

* **Request Data পড়া:**
  * `req.params`: URL পাথের ডায়নামিক প্যারামিটার পড়া (যেমন: `/users/:id` -> `req.params.id`)
  * `req.query`: URL-এর কুয়েরি স্ট্রিং পড়া (যেমন: `/search?page=1&limit=10` -> `req.query.page`)
  * `req.body`: HTTP POST/PUT রিকোয়েস্টের সাথে পাঠানো JSON ডাটা পড়া।
* **Response দেওয়া:**
  * `res.status()`: HTTP Status Code সেট করা (যেমন: `200` OK, `201` Created, `404` Not Found, `500` Server Error)।
  * `res.json()`: ক্লায়েন্টকে JSON ফরম্যাটে ডাটা ব্যাক পাঠানো।

---

## 3. Middleware Concepts

মিডলওয়্যার হলো এমন কিছু ফাংশন যা রিকোয়েস্ট (Request) ও রেসপন্স (Response)-এর মাঝে কাজ করে। এটি রিকোয়েস্ট ডাটা পরিবর্তন করতে পারে বা নির্দিষ্ট শর্তে রিকোয়েস্ট আটকে দিতে পারে।

* **Built-in Middleware (`express.json()`):** ক্লায়েন্ট থেকে আসা JSON ডাটা পার্স (Parse) করে `req.body`-তে এভেলেবল করে।
* **Custom Middleware:** ইউজার নিজের প্রয়োজনে লগার (Logger), অথেন্টিকেশন বা ভ্যালিডেশনের জন্য তৈরি করে।
* **CORS (`cors` package):** অন্য কোনো ডোমেন বা পোর্ট থেকে (যেমন: React `http://localhost:5173`) এপিআই কল করার অনুমতি দেয়।
* **Dotenv (`.env` file):** সিক্রেট কী, ডাটাবেজ ইউআরএল বা পোর্ট নম্বর পরিবেশের ভ্যারিয়েবল (Environment Variables) হিসেবে নিরাপদে রাখার জন্য ব্যবহৃত হয়।

---

## 4. Complete Express Code Implementation

নিচে উল্লেখিত সব কনসেপ্ট একত্রে ইমপ্লিমেন্ট করে একটি প্রোডাকশন-রেডি `app.js` স্ট্রাকচার নিচে দেওয়া হলো:

```javascript
// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==========================================
// 1. MIDDLEWARES (গ্লোবাল মিডলওয়্যার সেটআপ)
// ==========================================
app.use(cors());                 // CORS এনাবল করা (Cross-Origin Access)
app.use(express.json());         // req.body তে JSON ডাটা পার্স করার জন্য

// কাস্টম লগার মিডলওয়্যার (Custom Middleware Example)
const requestLogger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // পরবর্তী ফ্লোতে যাওয়ার জন্য আবশ্যক
};
app.use(requestLogger);


// ------------------------------------------
// ডামি ডাটাবেজ (In-Memory Array)
// ------------------------------------------
let users = [
    { id: 1, name: 'Rahim', email: 'rahim@example.com' },
    { id: 2, name: 'Karim', email: 'karim@example.com' }
];

// ==========================================
// 2. ROUTING & REQUEST/RESPONSE
// ==========================================

// GET: সব ইউজার নেওয়া (Query Parameters Example)
// Route: /api/users?search=rahim
app.get('/api/users', (req, res) => {
    const { search } = req.query; // req.query রিড করা
    
    if (search) {
        const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()));
        return res.status(200).json({ status: 'success', data: filteredUsers });
    }

    res.status(200).json({ status: 'success', count: users.length, data: users });
});

// GET: নির্দিষ্ট একজন ইউজার নেওয়া (Req Params Example)
// Route: /api/users/1
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id); // req.params রিড করা
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.status(200).json({ status: 'success', data: user });
});

// POST: নতুন ইউজার তৈরি করা (Req Body Example)
app.post('/api/users', (req, res) => {
    const { name, email } = req.body; // req.body রিড করা

    if (!name || !email) {
        return res.status(400).json({ status: 'fail', message: 'Name and email are required' });
    }

    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    res.status(201).json({ status: 'success', data: newUser });
});

// PUT: পুরো ইউজার অবজেক্ট রিপ্লেস/আপডেট করা
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    users[userIndex] = { id: userId, name, email };
    res.status(200).json({ status: 'success', data: users[userIndex] });
});

// PATCH: ইউজারের নির্দিষ্ট ডাটা আংশিক আপডেট করা
app.patch('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    res.status(200).json({ status: 'success', data: user });
});

// DELETE: ইউজার মুছে ফেলা
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(u => u.id !== userId);

    res.status(200).json({ status: 'success', message: `User with ID ${userId} deleted.` });
});


// ==========================================
// 3. ERROR HANDLING (Global Error Handler)
// ==========================================

// undefined Routes/404 Handler
app.use((req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.status = 404;
    next(error); // Global Error Handler এ পাস করে দেওয়া
});

// Global Error Handling Middleware (৪টি প্যারামিটার আবশ্যক: err, req, res, next)
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        status: 'error',
        statusCode: statusCode,
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

// ==========================================
// 4. SERVER LISTENING
// ==========================================
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});