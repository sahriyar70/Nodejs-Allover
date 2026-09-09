const path = require('path');

const samplePath = '/users/app/project/index.js';

console.log('Directory Name:', path.dirname(samplePath)); // Output: /users/app/project
console.log('Base File Name:', path.basename(samplePath)); // Output: index.js
console.log('File Extension:', path.extname(samplePath));  // Output: .js

// একাধিক পাথ সেগমেন্ট সঠিকভাবে যুক্ত করা
const fullPath = path.join(__dirname, 'public', 'images', 'logo.png');
console.log('Joined Path:', fullPath);