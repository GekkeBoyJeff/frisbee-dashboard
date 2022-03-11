import { fetchData } from "./getData.js"
import { changeState } from "./getData.js"
import { whichProgramLinkClicked } from "./getData.js"
import { apiURL } from "./getData.js"
import { getAccessToken } from "./auth.js"



let urlProgramsDone

let poolId

export function loadPrograms(data){ // case 3
    
    let programDiv = document.querySelector(`#programma`)
    programDiv.innerHTML = `<ul><h3>Gespeelde wedstrijden</h3></ul>`
    // alle wedstrijden

    if(whichProgramLinkClicked == 1){ 
        programDiv = document.querySelector(`#programma ul>li:first-child`)
        poolId = data.objects[0].id

    }else{
        poolId = data.objects[1].id
        programDiv.innerHTML = `<ul><h3>Programma</h3></ul>`
        programDiv = document.querySelector(`#programma ul:last-child`)
    }

    urlProgramsDone = `${apiURL}/v1/pool_rounds/?pool_id=${poolId}&access_token=` + getAccessToken();
    // console.log(urlProgramsDone)
    let urlGames = `${apiURL}/v1/games/?pool_id=${poolId}&order_by=%5Bstart_time%5D&limit=50&access_token=` + getAccessToken();
    changeState("programsDone");
    fetchData(urlProgramsDone)
}