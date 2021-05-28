import { getData } from "./getData.js";

async function getSumOfAllCustomQuestions(){
  const customFormAnswers = await getData("6", "\n\n")

  let totalAmountOfYeses = 0

  customFormAnswers.forEach(GroupAnswers => {
    let questionsAnsweredYes = new Set()
    let individualAnswers = GroupAnswers.split("\n")

    individualAnswers.forEach(question => {
      for (let i = 0; i < question.length; i++){
        questionsAnsweredYes.add(question[i])
      }
    });
    totalAmountOfYeses += questionsAnsweredYes.size
  });
  
  return totalAmountOfYeses
}

async function getSumOfAllCustomQuestions2(){
  const customFormAnswers = await getData("6", "\n\n")

  let totalAmountOfYeses = 0

  customFormAnswers.forEach(GroupAnswers => {
    let questionsAnsweredYes = 0
    let individualAnswers = GroupAnswers.split("\n").filter(e => e)
  
    for (let i = 0; i < individualAnswers[0].length; i++){
      if (individualAnswers.every(answer => answer.includes(individualAnswers[0][i]))){
        questionsAnsweredYes++
      }
    }
    totalAmountOfYeses += questionsAnsweredYes
  });
  
  return totalAmountOfYeses
}

console.log(await getSumOfAllCustomQuestions())
console.log(await getSumOfAllCustomQuestions2())
