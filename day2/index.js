const answer1 = require('./answer1');
const answer2 = require('./answer2');
var fs = require('fs');

const day2 = () => {
  const input = fs.readFileSync(`${__dirname}/input.js`, 'utf8');
  const checksum1 = answer1(input);
  const checksum2 = answer2(input);

  console.log(`day2:\n   answer 1: ${checksum1}\n   answer 2: ${checksum2}`);
}

module.exports = day2;