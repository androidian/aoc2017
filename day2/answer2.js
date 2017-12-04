
const isDivisor = (value, array) => {
  return array.reduce((previousValue, currentValue) => {
    if(previousValue)
      return true;

    if (value === currentValue)
      return false;

    return ((parseInt(currentValue) % parseInt(value)) === 0);
  }, false)
};

const isDividend = (value, array) => {
  return array.reduce((previousValue, currentValue) => {
    if(previousValue)
      return true;

    if (value === currentValue)
      return false;

    return ((parseInt(value) % parseInt(currentValue)) === 0);
  }, false)
};

const answer = (input) => {
  const rows = input.split('\n');

  const intermediates = rows.map((value) => {
    const cells = value.split("\t");
    
    const divisor = cells.reduce((previousValue, currentValue, index, array) => {
      if (isDivisor(currentValue, array))
        return currentValue;
      else
        return previousValue;
    }, 0);

    const dividend = cells.reduce((previousValue, currentValue, index, array) => {
      if (isDividend(currentValue, array))
        return currentValue;
      else
        return previousValue;
    }, 0);

    return {
      dividend,
      divisor
    };
  });
  const checksum = intermediates.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.dividend / currentValue.divisor);
  }, 0);

  return checksum;
};

module.exports = answer;