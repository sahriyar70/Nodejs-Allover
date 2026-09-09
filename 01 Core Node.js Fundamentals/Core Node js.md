# Core Node.js Fundamentals (মূল ভিত্তি)

**তারিখ:** ২০২৬-০৯-০৯  
**বিষয়:** Node.js Architecture, Module Systems, Built-in Modules & NPM

---

## Overview
Node.js হলো একটি ওপেন-সোর্স, ক্রস-প্ল্যাটফর্ম JavaScript Runtime Environment যা Chrome V8 Engine-এর ওপর নির্মিত। এটি মূলত Single-Threaded, Non-blocking, এবং Event-driven I/O মডেল ব্যবহার করে অত্যন্ত স্কেলেবল এবং দ্রুতগতির ব্যাকএন্ড সিস্টেম তৈরির সুযোগ দেয়।

---

## 1. Node.js Architecture

Node.js-এর কাজ করার মূল ৪টি উপাদান:

1. **Single Thread (Main Thread):** Node.js মূল কোড এক্সিকিউশনের জন্য কেবল একটিমাত্র JavaScript Thread ব্যবহার করে।
2. **Event Loop:** এটি সারাক্ষণ পর্যবেক্ষণ করে কোনো Async কাজ শেষ হয়েছে কি না। কাজ শেষ হলে তার Callback Event Queue থেকে নিয়ে Main Thread-এ এক্সিকিউট করায়।
3. **Non-blocking I/O:** কোনো সময়সাপেক্ষ কাজ (যেমন: File Read, DB Query) এলে Node.js মূল থ্রেডকে না আটকে ব্যাকগ্রাউন্ডে কাজ করতে পাঠায়।
4. **Thread Pool (via Libuv):** ভারী বা CPU-bound কাজের জন্য (যেমন: Cryptography, File I/O) Libuv লাইব্রেরির C++ Thread Pool (বাই-ডিফল্ট ৪টি থ্রেড) ব্যবহৃত হয়।

### আর্কিটেকচারের সংক্ষিপ্ত ডায়াগ্রাম:

[ Client Requests ]
│
▼
[ Event Queue ]
│
▼
[ Event Loop ] ──(If I/O/Async Task)──► [ Libuv Thread Pool / OS Kernel ]
│                                             │
│◄─────────── (Returns Callback) ──────────────┘
│
▼
[ Client Response ]


---

## 2. Module System

Node.js-এ কোড অর্গানাইজ এবং রিইউজেবল করার জন্য মডিউল সিস্টেম ব্যবহার করা হয়।

### A. CommonJS (`require` & `module.exports`)
Node.js-এর চিরাচরিত ও বাই-ডিফল্ট মডিউল সিস্টেম।

```javascript
// mathCommonJS.js
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

module.exports = {
    add,
    subtract
};

// mainCommonJS.js
const math = require('./mathCommonJS');

console.log('Add:', math.add(10, 5));         // Output: Add: 15
console.log('Subtract:', math.subtract(10, 5)); // Output: Subtract: 5