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
        
        // for(var t = 0; t < data.objects[0].standings.length; t++){
        //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[0].standings[t].team.name}<span>Rank: ${data.objects[1].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[1].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
        //     }
            // console.table(data.objects[0])
            // console.log(`Pool B Data | `,data.objects[0])
            
    }else{

        poolId = data.objects[1].id

        programDiv.innerHTML = `<ul><h3>Programma</h3></ul>`
        programDiv = document.querySelector(`#programma ul:last-child`)
        // for(var t = 0; t < data.objects[1].standings.length; t++){
        //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[1].standings[t].team.name}<span>Rank: ${data.objects[1].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[1].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
        // }
        // console.table(`Pool A Data | `,data.objects[1]) 
    }

    urlProgramsDone = `${apiURL}/v1/pool_rounds/?pool_id=${poolId}&access_token=` + getAccessToken();
    // console.log(urlProgramsDone)
    let urlGames = `${apiURL}/v1/games/?pool_id=${poolId}&order_by=%5Bstart_time%5D&limit=50&access_token=` + getAccessToken();
    changeState("programsDone");
    fetchData(urlProgramsDone)
}