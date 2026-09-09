const fs = require('fs/promises');
const path = require('path');

async function handleFiles() {
    const filePath = path.join(__dirname, 'example.txt');

    try {
        // ১. ফাইল রাইট বা ক্রিয়েট করা
        await fs.writeFile(filePath, 'Hello, Node.js Core Fundamentals!\n', 'utf-8');
        console.log('File created successfully.');

        // ২. ফাইলে অতিরিক্ত ডাটা যুক্ত করা (Append)
        await fs.appendFile(filePath, 'Adding another line to the file.\n', 'utf-8');
        console.log('Data appended.');

        // ৩. ফাইল রিড করা
        const data = await fs.readFile(filePath, 'utf-8');
        console.log('--- File Content ---');
        console.log(data);

        // ৪. ফাইল ডিলিট করা
        await fs.unlink(filePath);
        console.log('File deleted successfully.');
    } catch (error) {
        console.error('Error handling file:', error.message);
    }
}

handleFiles();