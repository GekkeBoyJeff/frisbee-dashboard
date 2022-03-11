import { timeComperator } from "./timeComperator.js"
import { hours } from "./timeComperator.js"

export let gameStartTime

export function loadGames(data){
    let programDiv = document.querySelector(`#programma`)
    programDiv.insertAdjacentHTML(`beforeend`, `<ul><h3>Huidige wedstrijden</h3></ul><ul><h3>Aankomende wedstrijden</h3></ul>`)
    for(let i = 0; i < data.objects.length; i++){
        programDiv = document.querySelector(`#programma>ul:first-child`)
        // waarde opslaan in een variabele werkt niet.

        // gametime = data.map(startTime => startTime.start_time)
        // map werkt ook niet lekker

        gameStartTime = data.objects[i].start_time
        timeComperator(data)

        if(hours > 2){ // Als de game al geweest is   
            // console.log('Deze game is al geweest')
            // console.log(data.objects)
            programDiv.insertAdjacentHTML('beforeend',`<li id="${data.objects[i].pool_round_id}"><a href="#result"><p>${data.objects[i].team_1.name}</p><p>vs</p><p>${data.objects[i].team_2.name}</p><ul><li>Team 1 score: ${data.objects[i].team_1_score}</li><li>Winner: ${data.objects[i].winner}</li><li>Team 2 score: ${data.objects[i].team_2_score}</li></ul></a></li>`)
        }
        
        else if(hours < 2 && hours >= 0){// Als de game nog niet is geweest
            // console.log('Deze game nu bezig')    
            // console.log(data.objects)
            programDiv = document.querySelector(`#programma ul:nth-child(2)`)
            programDiv.insertAdjacentHTML('beforeend',`<li id="${data.objects[i].pool_round_id}"><a href="#result"><p>${data.objects[i].team_1.name}</p><p>vs</p><p>${data.objects[i].team_2.name}</p><ul><li>Team 1 score: ${data.objects[i].team_1_score}</li><li>Winner: ${data.objects[i].winner}</li><li>Team 2 score: ${data.objects[i].team_2_score}</li></ul></a></li>`)
            
        }else if(hours < 0){
            // console.log('Deze game is nog niet gespeeld')   
            // console.log(data.objects)
            programDiv = document.querySelector(`#programma ul:nth-child(3)`)
            programDiv.insertAdjacentHTML('beforeend',`<li id="${data.objects[i].pool_round_id}"><a href="#result"><p>${data.objects[i].team_1.name}</p><p>vs</p><p>${data.objects[i].team_2.name}</p><ul><li>Team 1 score: ${data.objects[i].team_1_score}</li><li>Winner: ${data.objects[i].winner}</li><li>Team 2 score: ${data.objects[i].team_2_score}</li></ul></a></li>`)
        }

    }


}