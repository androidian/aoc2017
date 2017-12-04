const answer1 = require('./answer1');
const answer2 = require('./answer2');


const day3 = () => {
  const target = 347991;
  
  const steps = answer1(target);
  const sum = answer2(target); 

  console.log(`day3:\n   answer 1: ${steps}\n   answer 2: ${sum}`);
}

module.exports = day3;