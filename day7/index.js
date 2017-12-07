const fs = require('fs');

const parseSingleProgram = ((program, ) => {
  const tokens = program.split(' ');
  return {
    name: tokens[0],
    weight: tokens[1],
    children: null,
  }
})

const parseDisc = (disc) => {
  const children = disc.split(', ');
  return {
    children,
  }
}

const isProgramSupported = (program, supportingPrograms) => {
  return supportingPrograms.reduce((isSupported, supportingProgram) => {
    if (isSupported) {
      return true;
    }

    return (supportingProgram.children.includes(program.name));
  }, false)
}

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
//const input = fs.readFileSync(`${__dirname}/test.txt`, 'utf8');

const programs = input.split('\n').map((line) => {
  const tokens = line.split(' -> ');
  if(tokens.length === 1) {
    return parseSingleProgram(tokens[0]);
  }

  return Object.assign({}, parseSingleProgram(tokens[0]), parseDisc(tokens[1]));
 });

 const supportingPrograms = programs.filter((program) => {
   return (program.children != null);
 })

 const bottomProgram = supportingPrograms.reduce((bottomProgram, currentProgram, currentIndex, supportingPrograms) => {
  if(bottomProgram != null) {
    return bottomProgram;
  }

  if(!isProgramSupported(currentProgram, supportingPrograms)) {
    return currentProgram;
  }

  return null;
 }, null)

//console.log(supportingPrograms);
console.log(bottomProgram.name);


