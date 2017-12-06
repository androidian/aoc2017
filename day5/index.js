
const fs = require('fs');

const incrementMaze = (pos, maze) => {
  const firstHalf = maze.slice(0, pos);
  const middle = maze[pos] + 1;
  const secondHalf = maze.slice(pos+1);
  return firstHalf.concat(middle).concat(secondHalf);
}

const decrementMaze = (pos, maze) => {
  const firstHalf = maze.slice(0, pos);
  const middle = maze[pos] - 1;
  const secondHalf = maze.slice(pos+1);
  return firstHalf.concat(middle).concat(secondHalf);
}

const countJumps = (pos, maze, jumps) => {
  console.log(`pos=${pos}, value=${maze[pos]}`);
  if(pos + maze[pos] > maze.length-1)
    return jumps+1;

  return countJumps(pos + maze[pos], incrementMaze(pos, maze), jumps+1);
}

const input = fs.readFileSync(`${__dirname}/input.txt`, 'utf8');
let trampolineMaze = input.split('\n').map((value) => {
   return parseInt(value);
 });

//let trampolineMaze = [0, 3, 0, 1, -3];
let jumps = 0;
let pos = 0;

while(pos + trampolineMaze[pos] <= trampolineMaze.length-1) {
  //console.log(`pos=${pos}, value=${trampolineMaze[pos]}`);
  //console.log(`trampolineMaze=${trampolineMaze}`);
  let oldpos = pos;
  
  pos = pos + trampolineMaze[pos];

  if(trampolineMaze[oldpos] >= 3)
    trampolineMaze = decrementMaze(oldpos, trampolineMaze);
  else
    trampolineMaze = incrementMaze(oldpos, trampolineMaze);
  jumps = jumps+1;
}

jumps = jumps+1;

console.log(`jumps=${jumps}`);

