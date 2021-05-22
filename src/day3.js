import { getData } from './getData.js'

async function findSlopeHits(rightMovement, downMovement){
  const slope = await getData(3);

  let right = 0;
  let down = 0;
  let totalHits = 0;

  for (down; down < slope.length; down += downMovement){

    if (slope[down][right] === '#'){
      totalHits++;
    }

    right = (right + rightMovement) % slope[down].length;
  }

  return totalHits;
}

async function findProductOfSlopes(){
  const firstSlope = await findSlopeHits(1, 1);
  const secondSlope = await findSlopeHits(3, 1);
  const thirdSlope = await findSlopeHits(5, 1);
  const fourthSlope = await findSlopeHits(7, 1);
  const fifthSlope = await findSlopeHits(1, 2);

  const multiplied = firstSlope*secondSlope*thirdSlope*fourthSlope*fifthSlope;

  console.log(`Multiplied: ${multiplied}`);
}

findProductOfSlopes();
