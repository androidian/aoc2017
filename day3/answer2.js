const getNodeValue = (map, key) => {
  const node = (map.get(key)) || { value: 0 };
  return node.value;
}

const getNewColumn = (direction, column) => {
  switch(direction) {
    case 'RIGHT':
     return column+1;
    case 'LEFT':
     return column-1;
    default:
      return column;
  }
}

const getNewRow = (direction, row) => {
  switch(direction) {
    case 'UP':
     return row+1;
    case 'DOWN':
     return row-1;
    default:
      return row;
  }
}

const getNext = (spiralValues) => {
  const column = getNewColumn(spiralValues.direction, spiralValues.column);
  const row = getNewRow(spiralValues.direction, spiralValues.row);

  const up = getNodeValue(spiralValues.map, `${column}${row+1}`);
  const upRight = getNodeValue(spiralValues.map, `${column+1}${row+1}`);
  const right = getNodeValue(spiralValues.map, `${column+1}${row}`);
  const downRight = getNodeValue(spiralValues.map, `${column+1}${row-1}`);
  const down = getNodeValue(spiralValues.map, `${column}${row-1}`);
  const downLeft = getNodeValue(spiralValues.map, `${column-1}${row-1}`);
  const left = getNodeValue(spiralValues.map, `${column-1}${row}`);
  const upLeft = getNodeValue(spiralValues.map, `${column-1}${row+1}`);
  const nextValue = up + upRight + right + downRight + down + downLeft + left + upLeft;
  
  switch(spiralValues.direction) {
    case 'RIGHT':
      return {
        map: spiralValues.map,
        value: nextValue,
        column,
        row,
        distance: spiralValues.distance,
        step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
        direction: (spiralValues.step === spiralValues.distance) ? 'UP' : 'RIGHT',
      };
    
      case 'UP': 
        return {
          map: spiralValues.map,
          value: nextValue,
          column,
          row,
          distance: (spiralValues.step === spiralValues.distance) ? spiralValues.distance+1 : spiralValues.distance,
          step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
          direction: (spiralValues.step === spiralValues.distance) ? 'LEFT' : 'UP',
        };

      case 'LEFT': 
        return {
          map: spiralValues.map,
          value: nextValue,
          column,
          row,
          distance: spiralValues.distance,
          step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
          direction: (spiralValues.step === spiralValues.distance) ? 'DOWN' : 'LEFT',
        };

      case 'DOWN': 
        return {
          map: spiralValues.map,
          value: nextValue,
          column,
          row,
          distance: (spiralValues.step === spiralValues.distance) ? spiralValues.distance+1 : spiralValues.distance,
          step: (spiralValues.step === spiralValues.distance) ? 1 : spiralValues.step + 1,
          direction: (spiralValues.step === spiralValues.distance) ? 'RIGHT' : 'DOWN',
        };
  }
}

const buildNode = (value, column, row) => {
  const left = `${row-1}${column}`;
  const up = `${row}${column+1}`;
  const right = `${row+1}${column}`;
  const down = `${row}${column-1}`;

  return {
    value,
    left,
    up,
    right,
    down,
  };
}

const answer2 = (target) => {
  let vars = {
    map: new Map(),
    value: 1,
    column: 0,
    row: 0,
    distance: 1,
    step: 1,
    direction: 'RIGHT',
  };

  while(vars.value <= target) {
    vars.map.set(`${vars.column}${vars.row}`, buildNode(vars.value, vars.column, vars.row));
    vars = getNext(vars);
  }

  return vars.value;
}

module.exports = answer2;