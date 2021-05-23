import { getData } from "./getData.js";

async function ProcessPassport(requirements){
  const passports = await getData("4", "\n\n");

  let validPassports = 0;

  passports.forEach(passport => {
    if (requirements(passport)){
      validPassports++;
    }
  });

  return validPassports;
}

function firstRequirements(passport){
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const passed = requiredFields.every(field => passport.includes(field));

  return passed;
}

function secondRequirements(passport){
  const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  if (!requiredFields.every(field => passport.includes(field))){
    return false;
  }

  passport = passport.replace(/\n/g, " ") 

  const passed = 
    validateByr(passport) &&
    validateIyr(passport) &&
    validateEyr(passport) &&
    validateHgt(passport) &&
    validateHcl(passport) &&
    validateEcl(passport) &&
    validatePid(passport);

    return passed;
}

function getPassportValueForKey(passport, key){
  const start = passport.indexOf(`${key}:`)+key.length+1;
  const end = passport.indexOf(" ", start) === -1 ? passport.length : passport.indexOf(" ", start);
  const value = passport.substring(start, end);

  return value;
}

function validateByr(passport){
  const birthYear = getPassportValueForKey(passport, "byr")
  if (!isFourDigits(birthYear)) { return false; }

  return birthYear >= 1920 && birthYear <= 2002;
}

function validateIyr(passport){
  const issueYear = getPassportValueForKey(passport, "iyr")
  if (!isFourDigits(issueYear)) { return false; }

  return issueYear >= 2010 && issueYear <= 2020;
}

function validateEyr(passport){
  const expirationYear = getPassportValueForKey(passport, "eyr")
  if (!isFourDigits(expirationYear)) { return false; }

  return expirationYear >= 2020 && expirationYear <= 2030;
}

const isFourDigits = value => /^[0-9]{4}$/.test(value);

function validateHgt(passport){
  const heightWithUnit = getPassportValueForKey(passport, "hgt")

  const indexOfUnit = heightWithUnit.length-2;
  const unit = heightWithUnit.substring(indexOfUnit)
  const height = heightWithUnit.substring(0, indexOfUnit)

  if (unit === "cm") { return height >= 150 && height <= 193 }
  else if (unit === "in") { return height >= 59 && height <= 76 }
  return false;
}

function validateHcl(passport) {
  const hairColor = getPassportValueForKey(passport, "hcl")
  return /^#[0-9a-f]{6}$/.test(hairColor)
}

function validateEcl(passport) {
  const validEyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
  const eyeColor = getPassportValueForKey(passport, "ecl")

  return validEyeColors.some(validColor => eyeColor === validColor)
}

function validatePid(passport) {
  const passportId = getPassportValueForKey(passport, "pid")
  return /^[0-9]{9}$/.test(passportId)
}
const passingPassportsFirstReq = await ProcessPassport(firstRequirements);
const passingPassportsSecondReq = await ProcessPassport(secondRequirements);
console.log(`Passing passports with first requirements: ${passingPassportsFirstReq}\n` +
  `Passing passports with second requirements: ${passingPassportsSecondReq}`);