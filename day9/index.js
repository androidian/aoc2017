const fs = require('fs');
const answer1 = require('./answer1');

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
//const input = fs.readFileSync(`${__dirname}/test.txt`, 'utf8');

answer1(input);