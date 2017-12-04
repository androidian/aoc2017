const answer = (input, offset = 1) => {
  return input.split('').reduce((accumulator, currentValue, currentIndex, array) => {
    if(currentValue === array[(currentIndex+offset) % array.length])
      return accumulator + parseInt(currentValue);
    return accumulator;
  }, 0);
}

module.exports = answer;