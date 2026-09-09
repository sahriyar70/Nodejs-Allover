# Database Integration Guide (MongoDB & PostgreSQL)
 
**বিষয়:** NoSQL (MongoDB with Mongoose) & SQL (PostgreSQL with Prisma ORM)

---

## Overview
Node.js অ্যাপ্লিকেশনে ডাটা দীর্ঘস্থায়ী (Persist) করার জন্য ডাটাবেজ ব্যবহার করা হয়। ব্যাকএন্ডে প্রধানত দুই ধরনের ডাটাবেজ দেখা যায়:
1. **NoSQL (MongoDB):** ফ্লেক্সিবল, JSON-লাইক ডকুমেন্ট বেসড ডাটাবেজ। এটি পরিচালনা করতে **Mongoose** (ODM) ব্যবহার করা হয়।
2. **SQL (PostgreSQL):** রিলেশনাল ডাটাবেজ (Table & Row-based)। আধুনিক অ্যাপ্লিকেশনে এটি সহজে ব্যবহারের জন্য **Prisma** (ORM) বহুল জনপ্রিয়।

---

## Part 1: NoSQL (MongoDB with Mongoose)

Mongoose হলো একটি **Object Data Modeling (ODM)** লাইব্রেরি, যা MongoDB-এর ডাটা স্ট্রাকচার ঠিক রাখতে Schema এবং Model তৈরি করতে সাহায্য করে।

### Key Concepts:
* **Schema Design:** ডাটাবেজে কী ধরনের ডাটা (Type, Required, Unique ইত্যাদি) থাকবে তার ব্লু-প্রিন্ট বা নকশা।
* **Validation:** ডাটা সেভ করার আগে টাইপ চেকিং ও ভ্যালিডেশন নিশ্চিত করা।
* **Population:** এক কালেকশনের সাথে অন্য কালেকশনের রিলেশনশিপ (যেমন: `User` এবং `Post` এর সংযোগ) তৈরি ও ডাটা সংযুক্ত করা।

### MongoDB/Mongoose Code Implementation

#### 1. Schema & Model Definition (`models/User.js` & `models/Post.js`)

```javascript
const mongoose = require('mongoose');

// User Schema (Validation সহ)
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true
        },
        age: {
            type: Number,
            min: [18, 'Age must be at least 18']
        }
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema);

// Post Schema (Relationship / Population সহ)
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // User Model-এর সাথে রেফারেন্স তৈরি
            required: true
        }
    },
    { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = { User, Post };

