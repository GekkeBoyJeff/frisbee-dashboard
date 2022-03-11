import { loadTournaments } from './loadtournaments.js'
import { getAccessToken } from './auth.js'
import { loadPools } from './loadpools.js'
import { loadGames } from './loadgames.js'
import { loadPrograms } from './loadprograms.js'
import { loadProgramsDone } from './loadProgramsDone.js'

export const apiURL = "https://api.leaguevine.com"
export let origin = window.location.origin + `/frisbee-final/`

const apiTournament = `${apiURL}/v1/tournaments/`
const apiTournamentId = `[21291]`
const apiTournamentIdPool = `21291`
const apiTeams = `${apiURL}/v1/teams/`
const apiPools = `${apiURL}/v1/pools/`

const urlTournaments = apiTournament + `?tournament_ids=` + apiTournamentId + `&access_token=` + getAccessToken();
const urlPools = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
export const urlPrograms = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
export const urlPoolData = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
export let urlGames = `${apiURL}/v1/games/?pool_id=20787&order_by=%5Bstart_time%5D&limit=50&access_token=` + getAccessToken();

export let whichProgramLinkClicked // word aan het eind van loadPools gedefineerd

// Beginstate - tournament
let currentState = "tournament"

// geeft de constante door in de function
fetchData(urlTournaments)

// url is in dit geval dus urlTournament | een benaming voor je variabel die je meegeeft
export function fetchData(url){
    fetch(url)
    .then(res =>{
        if(res.ok){
            //console.log('specifiek tournament ophalen gelukt | ' + res.status)
            return res.json()
            .then(data => {
                // Ik roep currentstate aan (regel 14)
                switch(currentState){
                    case "tournament":
                        // als currentstate tournament is > doe dan ...
                        console.log(`state naar tournament`)
                        loadTournaments(data) // en geef je data mee zodat het gelezen kan worden
                        // console.log(data)
                        break;
                    case "pools":
                        console.log(`state naar pools`)    
                        loadPools(data) 
                        
                        break;
                    case "programs":
                        console.log(`state naar programs`)
                        loadPrograms(data)
                        //console.log(data)

                        break;
                    case "programsDone":
                        console.log(`state naar loadProgramsDone`)
                        loadProgramsDone(data)
                        // console.log(data.objects)
                        break;
                    case "gamedata":
                        console.log('state naar gamedata')
                        // console.log(data.objects)
                        loadGames(data)
                        break;
                }
            })
        }
    })
}

export function changeState(newState){
    currentState = newState;
}

// Tournament klikbaar maken
document.querySelector(`#intro a`).addEventListener("click", ()=>{
    fetchData(urlPools)
    // Als je hierop klikt, verander dan de currentstate naar Pools, dat verwijst terug terug naar je switch case
    changeState("pools");
})