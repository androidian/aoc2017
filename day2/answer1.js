const answer = (input) => {
  const rows = input.split('\n');

  const intermediates = rows.map((value) => {
    const cells = value.split("\t");
    const max = cells.reduce((accumulator, currentValue) => {
      return (parseInt(currentValue) > parseInt(accumulator)) ? currentValue : accumulator
    });

    const min = cells.reduce((accumulator, currentValue) => {
      return (parseInt(currentValue) < parseInt(accumulator)) ? currentValue : accumulator
    });
    
    return {
      max,
      min
    }
  });

  const checksum = intermediates.reduce((accumulator, currentValue) => {
    return accumulator + (currentValue.max - currentValue.min);
  }, 0);

  return checksum;
};

module.exports = answer;