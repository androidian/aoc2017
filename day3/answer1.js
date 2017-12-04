const getNext = (spiralValues) => {
  switch(spiralValues.direction) {
    case 'RIGHT':
      return {
        value: spiralValues.value+1,
        column: spiralValues.column+1,
        row: spiralValues.row,
        distance: spiralValues.distance,
        step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
        direction: (spiralValues.step === spiralValues.distance) ? 'UP' : 'RIGHT',
      };
    
      case 'UP': 
        return {
          value: spiralValues.value+1,
          column: spiralValues.column,
          row: spiralValues.row+1,
          distance: (spiralValues.step === spiralValues.distance) ? spiralValues.distance+1 : spiralValues.distance,
          step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
          direction: (spiralValues.step === spiralValues.distance) ? 'LEFT' : 'UP',
        };

      case 'LEFT': 
        return {
          value: spiralValues.value+1,
          column: spiralValues.column-1,
          row: spiralValues.row,
          distance: spiralValues.distance,
          step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
          direction: (spiralValues.step === spiralValues.distance) ? 'DOWN' : 'LEFT',
        };

      case 'DOWN': 
        return {
          value: spiralValues.value+1,
          column: spiralValues.column,
          row: spiralValues.row-1,
          distance: (spiralValues.step === spiralValues.distance) ? spiralValues.distance+1 : spiralValues.distance,
          step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
          direction: (spiralValues.step === spiralValues.distance) ? 'RIGHT' : 'DOWN',
        };
  }
}

const answer1 = (target) => {
  let vars = {
    value: 1,
    column: 0,
    row: 0,
    distance: 1,
    step: 1,
    direction: 'RIGHT',
  };

  while(vars.value < target) {
    vars = getNext(vars);
  }

  return Math.abs(vars.column) + Math.abs(vars.row);
};

module.exports = answer1;