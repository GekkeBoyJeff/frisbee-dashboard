import { gameStartTime } from "./loadgames.js";

let days
export let hours
let minutes

export function timeComperator(){
    // ik kwam er later achter dat ik de T niet hoeft te comparen

    let splittedCurT = currentTime_date.split(/[T+]/) // RegEx zodat je meerdere waarde mee kan geven

    // console.log(splittedCurT)
    splittedCurT.pop(); // laatste array item weghalen // timezone weghalen
   // [splittedCurT[0],splittedCurT[1]] = [splittedCurT[1],splittedCurT[0]]
    splittedCurT  = splittedCurT.join("T")
    // console.log(splittedCurT) // 2022-02-11T01:40:18

    let splittedGameT = gameStartTime.split("+")
    splittedGameT.pop();
    // console.log(splittedGameT)

    let timeNow = new Date(splittedCurT) // omzetten in data objecten
    let gameNow = new Date(splittedGameT) // omzetten in data objecten

    // console.log(timeNow)
    // console.log(gameNow)

    let difference = (timeNow.getTime() - gameNow.getTime()) // verschil in miliseconden

    // console.log(difference)
    days= Math.floor(difference / 60000)
    days = Math.ceil(days / 60 / 24) // aantal dagen
    hours = Math.floor(difference / (1000 * 60 * 60)) // aantal uren
    minutes = Math.floor(difference / (1000 * 60)) // aantal minuten
    // console.log(days)
    // console.log(hours)
    // console.log(minutes)

}

let today = new Date()

// aparte variabelen omdat deze enkele digits terug kunnen sturen:

let currentMonth = today.getMonth() + 1 // Blijkbaar telt javascript maanden vanaf 0...
currentMonth = (`0` + currentMonth).slice(-2)

let currentDay = today.getDate()
currentDay = (`0` + currentDay).slice(-2)

let currentHour = today.getHours()
currentHour = (`0` + currentHour).slice(-2)

let currentMinute = today.getMinutes()
currentMinute = (`0` + currentMinute).slice(-2)

let currentSecond = today.getSeconds()
currentSecond = (`0` + currentSecond).slice(-2)

let CurrentDate = today.getFullYear()+'-' +currentMonth+'-'+currentDay;
let CurrentTime = currentHour + ":" +currentMinute + ":" + currentSecond;
let CurrentTimezone = `+01:00`

let currentTime_date = CurrentDate + `T`+ CurrentTime + CurrentTimezone


