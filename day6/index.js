const fs = require('fs');

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
let blocks = input.split('\t').map((value) => {
   return parseInt(value);
 });

const reallocate = (index, blocks) => {
  let blocksCopy = blocks.slice();
  let indexCopy = index;
  let count = blocksCopy[indexCopy];
  blocksCopy[indexCopy] = 0;

  while(count > 0) {
    indexCopy = (indexCopy < blocksCopy.length-1) ? indexCopy+1 : 0;
    blocksCopy[indexCopy] = blocksCopy[indexCopy] + 1
    count = count-1;
  }
  return blocksCopy;
}

const findMaxIndex = (blocks) => {
  return blocks.reduce((maxIndex, value, currentIndex, blocks) => {
    return (value > blocks[maxIndex]) ? currentIndex : maxIndex;
  }, 0);
}

const isDuplicate = (blocks1, blocks2) => {
  return blocks1.reduce((isDup, value, currentIndex) => {
    if(!isDup) {
      return false;
    }

    return (value === blocks2[currentIndex]);
  }, true)
};

const duplicateFound = (blocks, memory) => {
  return memory.reduce((duplicateFound, memoryBlocks) => {
    if(duplicateFound) {
      return true;
    }

    return isDuplicate(blocks, memoryBlocks);
  }, false)
}

let memory = [];
let count = 0;
while(!duplicateFound(blocks, memory)) {
  memory[memory.length] = blocks.slice();
  blocks = reallocate(findMaxIndex(blocks), blocks);
  count = count + 1;
}

const findLoopSize = (blocks, memory) => {
  return memory.reduce((loopSize, memoryBlocks, currentIndex) => {
    if (loopSize > 0) {
      return loopSize;
    }

    if (isDuplicate(blocks, memoryBlocks)) {
      return memory.length - currentIndex;
    }

    return 0;
  }, 0);
}
  
console.log(count);
console.log(findLoopSize(blocks, memory));
