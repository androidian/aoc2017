const fs = require('fs');
const answer1 = require('./answer1');
const answer2 = require('./answer2');

const day4 = () => {
  const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
  const validPassphrases1 = answer1(input);
  const validPassphrases2 = answer2(input);
  
  console.log(`day4:\n   answer 1: ${validPassphrases1}\n   answer 2: ${validPassphrases2}`);
}

module.exports = day4;