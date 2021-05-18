import { getData } from "./getData.js";

async function findCorrectPasswords1(){
  const data = await getData("2");
  let totalCorrectPasswords = 0;

  data.forEach(row => {
    if(!row){ return; }

    const splitRow = row.split(" ");
    let [amount, letter, password] = splitRow;

    const [lowerAmount, higherAmount] = amount.split("-")
    letter = letter.replace(":", "").trim();
    password = password.trim();

    const regExp = new RegExp(letter, "g")
    const letterCount = password.match(regExp)?.length;

    if (letterCount >= lowerAmount && letterCount <= higherAmount){
      totalCorrectPasswords++;
    }
  });

  return totalCorrectPasswords;
}

async function findCorrectPasswords2(){
  const data = await getData("2");
  let totalCorrectPasswords = 0;

  data.forEach(row => {
    if(!row){ return; }

    const splitRow = row.split(" ");
    let [amount, letter, password] = splitRow;

    const [firstIndex, secondIndex] = amount.split("-")
    letter = letter.replace(":", "").trim();
    password = password.trim();

    // XOR
    if ((password[firstIndex-1] === letter) != (password[secondIndex-1] === letter)){
      totalCorrectPasswords++;
    }
  })

  return totalCorrectPasswords;
}

// console.log(await findCorrectPasswords1());
console.log(await findCorrectPasswords2());
