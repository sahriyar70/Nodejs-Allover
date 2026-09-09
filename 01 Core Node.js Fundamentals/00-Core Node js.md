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

# Node.js Architecture & Execution Model

Node.js মূলত **Single-Threaded, Event-Driven, Non-blocking I/O** আর্কিটেকচার মেনে চলে।

---

## Core Components Breakdown

1. **Single Thread (Main Thread):** 
   * **কাজ:** সম্পূর্ণ অ্যাপ্লিকেশনের মূল জাভাস্ক্রিপ্ট কোড এবং ইভেন্ট প্রসেসিং একটিমাত্র থ্রেডে সম্পন্ন হয়। 
   * **সুবিধা:** থ্রেড ব্যবস্থাপনা সহজ এবং মেমোরি খরচ অনেক কম।

2. **Non-blocking I/O:** 
   * **কাজ:** ফাইল সিস্টেম, ডাটাবেজ কোয়েরি বা নেটওয়ার্ক রিকোয়েস্টের মতো I/O অপারেশনের জন্য মূল থ্রেড ব্লকেড বা আটকে থাকে না। 
   * **সুবিধা:** সিস্টেমের থ্রুপুট (Throughput) বহুগুণ বেড়ে যায়।

3. **Thread Pool (via Libuv):** 
   * **কাজ:** C++ ভিত্তিক Libuv লাইব্রেরি ৪টি ব্যাকগ্রাউন্ড থ্রেড মেইনটেইন করে। ভারী CPU-bound (যেমন: Password Hashing, File Compression) কাজগুলো মেইন থ্রেড থেকে সরিয়ে এখানে প্রসেস করা হয়।

4. **Event Loop:** 
   * **কাজ:** ব্যাকগ্রাউন্ডে সম্পূর্ণ হওয়া I/O বা অ্যাসিঙ্ক কাজের Callback টাস্কগুলোকে পর্যবেক্ষণ করে এবং মেইন থ্রেড ফাঁকা হওয়া মাত্রই সেগুলোকে এক্সিকিউট করায়।

---

## Analogy (সহজ মানসিক মডেল)
* **Main Thread:** রেস্তোরাঁর একমাত্র ওয়েটার (অর্ডার গ্রহণ ও ডেলিভারি করে)।
* **Non-blocking I/O:** ওয়েটার অর্ডারের জন্য টেবিলে দাঁড়িয়ে না থেকে দ্রুত অন্য টেবিলে চলে যায়।
* **Thread Pool:** রান্নাঘরের ৪ জন শেফ (ভারী রান্নার কাজ ব্যাকগ্রাউন্ডে করে)।
* **Event Loop:** রান্নার পর বেজে ওঠা বেল, যা ওয়েটারকে জানিয়ে দেয় খাবার রেডি।

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