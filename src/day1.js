import { getData } from "./getData.js";

async function findCorrectNumbers(){

  const numbers = await getData("1", "\n")
  
  for (let first = 0; first < numbers.length-2; first++){
    for (let second = first+1; second < numbers.length-1; second++){
      for (let third = second+1; third < numbers.length; third++){
        if (parseInt(numbers[first])+parseInt(numbers[second])+parseInt(numbers[third]) === 2020){
          console.log(`first: ${numbers[first]}, second: ${numbers[second]}, third: ${numbers[third]}, ` + 
            `multiplied: ${numbers[first]*numbers[second]*numbers[third]}`)
          return;
        }
      }
    }
  }
}

await findCorrectNumbers() 