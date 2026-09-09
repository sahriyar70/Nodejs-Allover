// sNode.js-এর ইভেন্ট ড্রাইভেন আর্কিটেকচার বাস্তবায়নে EventEmitter ব্যবহার করা হয়।

const EventEmitter = require('events');

// কাস্টম ইভেন্ট এমিটার ক্লাস তৈরি
class Logger extends EventEmitter {
    log(message) {
        console.log(`Log Message: ${message}`);
        // ইভেন্ট ট্র্রিগার বা ট্র্যাকিং করা
        this.emit('messageLogged', { id: Date.now(), text: message });
    }
}

const logger = new Logger();

// ইভেন্ট লিসেনার সেট করা (emitter.on)
logger.on('messageLogged', (data) => {
    console.log('Listener Triggered! Event Data:', data);
});

// কাজ চালানো
logger.log('User logged into the system.');