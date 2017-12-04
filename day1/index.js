const input = require('./input');
const answer = require('./answer');

module.exports = () => {
  const answer1 = answer(input);
  const answer2 = answer(input, input.length/2);
  console.log(`day1:\n   answer 1: ${answer1}\n   answer 2: ${answer2}`);
};
