# Advanced Node.js Built-in Modules & Configuration
  
**বিষয়:** `os`, `crypto`, `buffer` Modules & `dotenv` Environment Configuration

---

## Overview
Node.js-এ সার্ভার হার্ডওয়্যার বা অপারেটিং সিস্টেম মনিটরিং, সিকিউরিটি ও পাসওয়ার্ড হ্যাশিং, বাইনারি ডাটা প্রসেসিং এবং সিক্রেট কনফিগারেশন ম্যানেজ করার জন্য এই মডিউলগুলো অত্যন্ত গুরুত্বপূর্ণ।

---

## 1. Operating System (`os`) Module

`os` মডিউল ব্যবহার করে যে সার্ভারে Node.js কোডটি চলছে, সেই অপারেটিং সিস্টেম এবং হার্ডওয়্যার (CPU, RAM, Uptime ইত্যাদি) সম্পর্কিত নানা গুরুত্বপূর্ণ তথ্য সংগ্রহ করা যায়।

### বাস্তব প্রয়োগ:
* সার্ভার হেলথ মনিটরিং (Server Health Check / Metrics dashboard)।
* কতগুলো CPU Core খালি আছে তা দেখে লোড ব্যালেন্সিং বা `cluster` মডিউল ব্যবহার করা।

```javascript
const os = require('os');

console.log('--- OS Module Information ---');

// ১. সিস্টেম প্ল্যাটফর্ম ও আর্কিটেকচার
console.log('Platform:', os.platform()); // e.g., 'win32', 'linux', 'darwin'
console.log('Architecture:', os.arch());     // e.g., 'x64', 'arm64'

// ২. CPU তথ্য (কতটি Core আছে)
const cpus = os.cpus();
console.log('CPU Core Count:', cpus.length);
console.log('CPU Model:', cpus[0].model);

// ৩. RAM / মেমোরি হিসাব (Bytes থেকে GB-তে রূপান্তর)
const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);
console.log(`Memory: ${freeMemGB} GB free out of ${totalMemGB} GB`);

// ৪. ইউজার ও সিস্টেম রানটাইম (Uptime)
console.log('System Uptime:', (os.uptime() / 3600).toFixed(2), 'Hours');
console.log('User Home Directory:', os.homedir());

//Crypto module 

// crypto মডিউল এনক্রিপশন, ডিক্রিপশন, পাসওয়ার্ড হ্যাশিং (Hashing), এবং সিকিউর র‍্যান্ডম টোকেন বা আইডি জেনারেট করার জন্য ব্যবহৃত হয়। এটি C++ ভিত্তিক Libuv Thread Pool ব্যবহার করে ভারী হিসাব সম্পাদন করে।

// বাস্তব প্রয়োগ:
// ইউজার পাসওয়ার্ড ডাটাবেজে সেভ করার আগে Hash করা।

// ইমেইল ভেরিফিকেশন বা পাসওয়ার্ড রিসেটের জন্য সিকিউর টোকেন বা UUID তৈরি করা।

const crypto = require('crypto');

console.log('--- Crypto Module Operations ---');

// ১. সিকিউর র‍্যান্ডম আইডি / টোকেন তৈরি
const randomToken = crypto.randomBytes(16).toString('hex');
console.log('Random Verification Token:', randomToken);

// ২. UUID v4 জেনারেট করা
const uniqueId = crypto.randomUUID();
console.log('Generated UUID:', uniqueId);

// ৩. SHA-256 দিয়ে ডাটা হ্যাশিং (Hashing)
const data = 'MySecretPassword123';
const hash = crypto.createHash('sha256').update(data).digest('hex');
console.log('SHA-256 Hash:', hash);

// ৪. PBKDF2 ব্যবহার করে পাসওয়ার্ড হ্যাশ করা (Salting সহ সিকিউর উপায়)
const password = 'userSecurePassword';
const salt = crypto.randomBytes(16).toString('hex');

crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) throw err;
    console.log('PBKDF2 Hashed Password:', derivedKey.toString('hex'));
});


//Buffer (buffer) Module

// Buffer মডিউল ডাটাবেজ, ফাইল বা নেটওয়ার্ক থেকে আসা কাঁচা বাইনারি ডাটা (Raw Binary Data) মেমোরিতে ধরে রাখা এবং ম্যানিপুলেট করার জন্য ব্যবহৃত হয়। এটি একটি বিশ্বজনীন (Global) মডিউল, তাই require('buffer') না লিখেও সরাসরি ব্যবহার করা যায়।

// বাস্তব প্রয়োগ:
// ইমেজ, ভিডিও বা পিডিএফ ফাইল প্রসেসিং।

// ফাইল স্ট্রিম (Streams) বা নেটওয়ার্ক সকেটের কাঁচা বাইনারি মেমোরি হ্যান্ডেল করা।

// Base64 এনকোডিং বা ডিক্রিপশন।


console.log('--- Buffer Module Operations ---');

// ১. স্ট্রিং থেকে বাফার তৈরি
const buf1 = Buffer.from('Hello Node.js');
console.log('Buffer (Hex/Binary Representation):', buf1); 
// Output: <Buffer 20 2e 48 4e 64 65 6a 6c 6f 73>

// ২. বাফার থেকে আবার নরমাল স্ট্রিং-এ রূপান্তর
console.log('Decoded String:', buf1.toString('utf-8')); // Output: Hello Node.js

// ৩. Base64 এনকোডিং ও ডিকোর্ডিং
const base64Data = buf1.toString('base64');
console.log('Base64 Encoded:', base64Data);

const decodedBuf = Buffer.from(base64Data, 'base64');
console.log('Restored Text:', decodedBuf.toString('utf-8'));

// ৪. মেমোরিতে নির্দিষ্ট সাইজের খালি বাফার বরাদ্দ করা (১০ বাইট)
const allocBuf = Buffer.alloc(10);
allocBuf.write('Node');
console.log('Allocated Buffer:', allocBuf);


//Dotenv (dotenv) Configuration

// dotenv হলো একটি জিরো-ডিপেন্ডেন্সি মডিউল যা .env ফাইল থেকে ইনভায়রনমেন্ট ভ্যারিয়েবলগুলো process.env-এ লোড করে দেয়।

// কেন ব্যবহার করবেন?
// API Key, Database Credentials, JWT Secret—এগুলো সরাসরি কোডে লিখলে সিকিউরিটি ঝুঁকি তৈরি হয়।

// লোকাল টেস্ট এনভায়রনমেন্ট ও লাইভ প্রোডাকশন সার্ভারের পোর্ট বা ডাটাবেজ আলাদা রাখতে।

# .env file
PORT=5000
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/myapp
JWT_SECRET=super_secret_jwt_key_2026