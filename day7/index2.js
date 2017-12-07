const fs = require('fs');

const parseSingleProgram = (program) => {
  const tokens = program.split(' ');
  return {
    name: tokens[0],
    weight: parseInt(tokens[1].slice(1).slice(0, -1)),
    disc: null,
  }
}

const parseDisc = (disc) => {
  const programs = disc.split(', ');
  return {
    disc: programs,
  }
}

const isProgramSupported = (program, supportingPrograms) => {
  return supportingPrograms.reduce((isSupported, supportingProgram) => {
    if (isSupported) {
      return true;
    }

    return (supportingProgram.disc.includes(program.name));
  }, false)
}

const findProgram = (programName, programs) => {
  return programs.reduce((foundProgram, program) => {
    if (foundProgram != null) {
      return foundProgram;
    }

    return (programName === program.name) ? program : null;
  }, null);
}

const findWeight = (program, programs) => {
  if(program.disc) {
    const childrenWeigth = program.disc.reduce((weigth, programName) => {
      return weigth + findWeight(findProgram(programName, programs), programs);
    }, 0)

    return childrenWeigth + program.weight;
  }

  return program.weight;
}

const isDiscBalanced = (program, programs) => {
  if(program.disc) {
    const childWeights = program.disc.map((programName) => {
      const childProgram = findProgram(programName, programs);
      return findWeight(childProgram, programs);
    })

    const weight = childWeights[0];
    return childWeights.filter(childWeight => childWeight !== weight).length === 0;
  }

  return true;
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
   return (program.disc != null);
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


console.log(bottomProgram);

const findOutOfBalance = (program, programs) => {
  const discPrograms = program.disc.map((name) => {
    const discProgram = findProgram(name, programs);
    const mapped = {
      name,
      weight: discProgram.weight,
      totalWeight: findWeight(discProgram, programs),
      disc: discProgram.disc,
    }
    return mapped;
  });

  return discPrograms.reduce((previousProgram, currentProgram, index, array) => {
    //check if weights are different
    if(previousProgram.totalWeight !==  currentProgram.totalWeight) {
      // if we are at the end of the list
      if(index === array.length-1) {
        //if at end of the list then get the previous item;
        const diffProgram = array[index-1];

        // and return whichever program is different;
        if (previousProgram.totalWeight === diffProgram.totalWeight) {
          return Object.assign({}, currentProgram, { weightdiff: Math.abs(previousProgram.totalWeight-currentProgram.totalWeight) });
        }
        
        return Object.assign({}, previousProgram, { weightdiff: Math.abs(previousProgram.totalWeight-currentProgram.totalWeight) });
      }

      //if not at the end of the list get the next item;
      const nextProgram = array[index+1];

      //and return whichever program is different;
      if (previousProgram.totalWeight === nextProgram.totalWeight) {
        return Object.assign({}, currentProgram, { weightdiff: Math.abs(previousProgram.totalWeight-currentProgram.totalWeight) });
      }
      
      return Object.assign({}, previousProgram, { weightdiff: Math.abs(previousProgram.totalWeight-currentProgram.totalWeight) });
    }

    //weights are the same, move to next pair
    return currentProgram;
  });
}

const findBadProgram = (program, programs) => {
    //if disc is balanced then this must be the out of balance program
    if(isDiscBalanced(program, programs)) {
      return program;
    }

    //else find the program on the disc that is out of balance
    const outOfBalance = findOutOfBalance(program, programs);
    return findBadProgram(outOfBalance, programs);
};


const badProgram = findBadProgram(bottomProgram, programs);

console.log(badProgram);
