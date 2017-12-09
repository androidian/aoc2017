let totalGarbage = 0;

const removeGarbage = (incomingsStream) => {
  let start = 0;
  let end = 0;
  let ignore = false;
  let startFound = false;
  let endFound = false;
  let stream = incomingsStream.slice();

  while(start < stream.length && end < stream.length) {
    // console.log(`startValue:${stream[start]} endValue:${stream[end]} ignore:${ignore} startFound:${startFound} start:${start} end:${end} length:${stream.length}`);  
    if(ignore) {
      ignore = false;
    }
    else {
      ignore = stream[end] === '!';

      if (startFound && !ignore) {
        totalGarbage++
      }

      startFound = stream[start] === '<';
      endFound = stream[end] === '>'
      
      if(endFound) {
        //console.log(`startValue:${stream[start]} endValue:${stream[end]} start:${start} end:${end} length:${stream.length}`);
        totalGarbage--;
        stream=stream.slice(0, start).concat(stream.slice(end+1));
        endFound = false;
        startFound = false;
        end=start;
      } 
    }
    start = (startFound) ? start : start + 1;
    end = end+1;
  }

  return stream;
}


const findScore = (stream) => {
  const startingArgs = {
    score: 0,
    value: 0,
  };

  const result = stream.reduce((args, item) => {
    const newArgs = Object.assign({}, args);
    switch(item) {
      case '{':
        newArgs.value++;
        break;
      case '}':
        newArgs.score = newArgs.score + newArgs.value;
        newArgs.value--;
        break;
    }
    
    return newArgs;
  }, startingArgs)

  return result.score;
}


const answer1 = (input) => {
  const stream = input.split('');
  const cleanStream = removeGarbage(stream);
  console.log(`totalGarbage=${totalGarbage}`);
  const score = findScore(cleanStream);
  console.log(`score=${score}`);
}

module.exports = answer1;
