const fs = require('fs');

let globalMax = 0;

const MapInstruction = (instruction) => {
  return {
    reg1: instruction[0],
    reg2: instruction[4],
    operation: instruction[1],
    conditional: instruction[5],
    value1: parseInt(instruction[2]),
    value2: parseInt(instruction[6]),
  };
}

const getRegister = (regKey, registers) => {
  const reg = registers.get(regKey);
  return (reg === undefined) ? 0 : reg;
}

const checkCondition = (register, conditional, value) => {
  switch(conditional) {
    case '==':
      return (register === value);
    case '!=':
      return (register !== value);
    case '>':
      return (register > value);
    case '>=':
      return (register >= value);
    case '<':
      return (register < value);
    case '<=':
      return (register <= value);
    default:
      return register;
  }
}

const performInstruction = (register, operation, value) => {
  switch(operation) {
    case 'inc':
    return (register+value);
  case 'dec':
    return (register-value);
  }
}

const executeInstruction = (instruction, registers) => {
  const conditionalValue = getRegister(instruction.reg2, registers);
  const operationValue = getRegister(instruction.reg1, registers);
  
  //if condition is met
  if(checkCondition(conditionalValue, instruction.conditional, instruction.value2)) {
    //perform instruction
    const result = performInstruction(operationValue, instruction.operation, instruction.value1);
    globalMax = (result > globalMax) ? result : globalMax;
    const registerCopy = new Map(registers);
    registerCopy.set(instruction.reg1, result);
    return registerCopy;
  }
  
  //do nothing
  return registers
}

const findMax = (registers) => {
  let maximum = 0;
  for(let register of registers.values()) {
    maximum = (register > maximum) ? register : maximum;
  }
  return maximum
}

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
//const input = fs.readFileSync(`${__dirname}/test.txt`, 'utf8');

const registers = input.split('\n').reduce((registers, line) => {
  const instruction = MapInstruction(line.split(' '));
  return executeInstruction(instruction, registers);
}, new Map())

console.log(findMax(registers));
console.log(globalMax);