import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

export async function getData(day){
  try{
    const response = await axios.get(`https://adventofcode.com/2020/day/${day}/input`, 
      {headers: {Cookie: `session=${process.env.SESSION_ID};`}});
    return response.data.split("\n");
  } catch (error){
    console.error(error);
    return "";
  }
}