'use strict';

process.stdin.on('data', (input) => {
    const reversed = input.reverse().toString().trim();
    process.stdout.write(`${reversed}\n`);
});
