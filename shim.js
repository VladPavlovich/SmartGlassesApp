// Import polyfills and libraries necessary for MQTT and other Node modules
import { Buffer } from 'buffer';
import process from 'process';
import EventEmitter from 'events';
import stream from 'stream-browserify';
import { URL, URLSearchParams } from 'url';

// Assign globals that are expected by Node modules and are not present in React Native's environment
global.Buffer = Buffer;
global.process = process;

// Polyfill for Node's URL and URLSearchParams
global.URL = URL;
global.URLSearchParams = URLSearchParams;

// Stream and Events are necessary for many modules including MQTT
if (!global.stream) {
    global.stream = stream;
}

if (!global.EventEmitter) {
    global.EventEmitter = EventEmitter;
}

// Polyfills for crypto, since it's used by many dependencies for security (optional, depends on your usage)
global.crypto = require('crypto');

// This ensures the randomness needed by crypto is available
global.crypto.getRandomValues = (byteArray) => {
    for (let i = 0; i < byteArray.length; i++) {
        byteArray[i] = Math.floor(256 * Math.random());
    }
};

// Required for MQTT.js and other libraries that depend on Node's timing functions
require('react-native-get-random-values');
