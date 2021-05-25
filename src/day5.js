import { getData } from './getData.js'

async function sanityCheck(){
  const boardingPasses = await getData("5", "\n")
  let highestCurrentSeat = 0;

  boardingPasses.forEach(boardingPass => {
    if (!boardingPass) { return; }

    const rowNumber = getRowNumber(boardingPass)
    const columnNumber = getColumnNumber(boardingPass)
    const seatNumber = (rowNumber*8)+columnNumber

    if (seatNumber > highestCurrentSeat){
      highestCurrentSeat = seatNumber
    }
  });

  return highestCurrentSeat
}

function getRowNumber(boardingPass){
  let low = 0
  let high = 127

  const rowDirections = boardingPass.substring(0, 7)
  
  for (let i = 0; i < rowDirections.length; i++){
    if (rowDirections[i] === 'F') {
      high = Math.floor((high+low)/2)
    }
    else {
      low = Math.ceil((high+low)/2)
    }
  }

  return high
}

function getColumnNumber(boardingPass){
  let low = 0
  let high = 7

  const columnDirections = boardingPass.substring(7)
  
  for (let i = 0; i < columnDirections.length; i++){
    if (columnDirections[i] === 'L') {
      high = Math.floor((high+low)/2)
    }
    else {
      low = Math.ceil((high+low)/2)
    }
  }

  return high
}

async function findMySeat(){
  const boardingPasses = await getData(5, "\n")
  const highestSeatNumber = 959

  let takenSeats = initializeSeatsArray(highestSeatNumber)

  boardingPasses.forEach(boardingPass => {
    if (!boardingPass) { return; }

    const rowNumber = getRowNumber(boardingPass)
    const columnNumber = getColumnNumber(boardingPass)
    const seatNumber = (rowNumber*8)+columnNumber

    takenSeats[seatNumber] = 'X'
  });

  const firstSeat = takenSeats.indexOf('X')
  const mySeat = takenSeats.indexOf(' ', firstSeat)
  
  return mySeat
} 

function initializeSeatsArray(highestSeatNumber) {
  return Array.apply(null, Array(highestSeatNumber)).map(() => ' ')
}

console.log(await sanityCheck())
console.log(await findMySeat())