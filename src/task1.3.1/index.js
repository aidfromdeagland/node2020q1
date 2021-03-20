'use-strict';

import readline from 'readline';
import { Transform } from 'stream';

const reverseString = (input) => {
    let reversedInput = '';
    for (let i = input.length - 1; i >= 0; i--) {
        reversedInput += input[i];
    }
    return reversedInput;
};


// event based approach:
const initEventBasedInputReversion = () => {
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (line) => {
        const reversed = reverseString(line);
        process.stdout.write(`${reversed}\n`);
    });
     
    if (process.stdin.isPaused()) {
        process.stdin.resume();
    }
};

// pipe based approach:
const initPipeBasedInputReversion = () => {
    const reverseInputStream = new Transform({
        decodeStrings: false,
        transform(line, encoding, callback) {
            const reversedInput = reverseString(line);
            callback(null, `${reversedInput}\n`);
        }    
    });
    
    process.stdin.setEncoding('utf8');
    
    process.stdin
    .pipe(reverseInputStream)
    .pipe(process.stdout);
};

// input reversion via readline:
const initReadlineBasedInputReversion = () => {
    const reverseInputReadline = readline.createInterface({
        input: process.stdin,
    });

    reverseInputReadline.on('line', (line) => {
        process.stdout.write(`${reverseString(line)}\n`);
    });
};

const reverseStrategies = {
    'event-based': initEventBasedInputReversion,
    'pipe-based': initPipeBasedInputReversion,
    'readline-based': initReadlineBasedInputReversion,
};

const getReversionStrategyNames = () => {
    return Object.keys(reverseStrategies);
}

const introReadline = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: `choose task1 implementation: ${getReversionStrategyNames().join('/')}\n`,
});

introReadline.prompt();

introReadline.on('line', (line) => {
    const trimmedAnswer = line.trim();

    if (reverseStrategies[trimmedAnswer]) {
        introReadline.close();
        introReadline.removeAllListeners();
        
        process.stdout.write(`initialising ${trimmedAnswer} strategy...\n`);
        reverseStrategies[trimmedAnswer]();
    } else {
        introReadline.prompt();
    }
});
