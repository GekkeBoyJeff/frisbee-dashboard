const apiURL = "https://api.leaguevine.com"
const origin = window.location.origin + `/frisbee-final/`

const apiTournament = `${apiURL}/v1/tournaments/`
const apiTournamentId = `[21291]`
const apiTournamentIdPool = `21291`
const apiTeams = `${apiURL}/v1/teams/`
const apiPools = `${apiURL}/v1/pools/`

let today = new Date()
let date = today.getFullYear()+'-'+ "0" +(today.getMonth()+1)+'-'+`0`+today.getDate();
let time = `0` + today.getHours() + ":" +today.getMinutes();
let timezone = `-04:00`

let enterTime = date + `T`+ time + timezone

let poolId

const urlTournaments = apiTournament + `?tournament_ids=` + apiTournamentId + `&access_token=` + getAccessToken();
const urlPools = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
const urlPrograms = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
let urlProgramsDone

// Beginstate - tournament
let currentState = "tournament"

// geeft de constante door in de function
fetchData(urlTournaments)

// url is in dit geval dus urlTournament | een benaming voor je variabel die je meegeeft
function fetchData(url){
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
                        break;
                    case "pools":
                        loadPools(data)
                        console.log(`state naar pools`)
                        break;
                    case "programs":
                        loadPrograms(data)
                        //console.log(data)
                        console.log(`state naar programs`)
                        break;
                    case "programsDone":
                        loadProgramsDone(data)
                        console.log(data.objects)
                        console.log(`state naar loadProgramsDone`)
                        break;
                }
            })
        }
        
    })
}

function changeState(newState){
    currentState = newState;
}

function loadTournaments(data){ // case 1
    console.log(`rournament data from fetch | `, data.objects[0]);
    document.querySelector(`#intro a h2`).innerHTML = `${data.objects[0].name}`
    // document.querySelector(`#intro a p:nth-child(3)`).innerHTML = `${data.objects[0].info}`
    document.querySelector(`#intro a p:nth-child(3)`).innerHTML = `${data.objects[0].start_date} - ${data.objects[0].end_date}`
    document.querySelector(`#intro a p:nth-child(4)`).innerHTML = `${data.objects[0].season.name}`
    document.querySelector(`h1>a`).href=`${origin}`
}

// Tournament klikbaar maken
document.querySelector(`#intro a`).addEventListener("click", ()=>{
    fetchData(urlPools)
    // Als je hierop klikt, verander dan de currentstate naar Pools, dat verwijst terug terug naar je switch case
    changeState("pools");
})

function loadPools(data){ // case 2
    const poolDiv = document.querySelector(`#pools`)
    
    for(let i = 0; i < data.objects.length; i++){
        if(data.objects != ''){
            poolDiv.insertAdjacentHTML('beforeend',`<ul></ul>`)
        }
    }

    let poolDivUl = document.querySelector(`#pools ul`)
    // console.log(poolDivUl)
    
    let ulCounter = 0

    // data.objects.reverse() // A & B staan anders omgedraaid

    document.querySelector(`#intro a`).addEventListener("click",()=>{
        poolDiv.innerHTML = '';
       // document.querySelector(`#intro`).classList.add(`.disabled`)
    })

    for(let i = 0; i < data.objects.length; i++){
        if(ulCounter == 1){
            poolDivUl = document.querySelector(`#pools ul:last-child`) // 2de ul
        }
        if(data.objects != ''){
            poolDivUl.insertAdjacentHTML('beforeend',`<span>Pool ${data.objects[i].name}</span><a href="#programma" class="programChecker"><h3>Pool ${data.objects[i].name}</h3></a>`)
            ulCounter++
            for(let t = 0; t < data.objects[i].standings.length; t++){
                poolDivUl.insertAdjacentHTML('beforeend',`<li>${data.objects[i].standings[t].team.name}</li>`)
            }
            poolDivUl.insertAdjacentHTML('beforeend',`<li>Bekijk het Programma</li>`)
        }
    } // einde pools

    const programChecker1 = document.querySelector(`#pools ul:first-child a`)
    const programChecker2 = document.querySelector(`#pools ul:last-child a`)

    programChecker1.addEventListener("click",()=>{
        fetchData(urlPrograms)
        changeState("programs");

        whichProgramLinkClicked = 1
    })
    programChecker2.addEventListener("click",()=>{
        fetchData(urlPrograms)
        changeState("programs");

        whichProgramLinkClicked = 2
    })



} // eind Loadpools

let whichProgramLinkClicked // word aan het eind van loadPools gedefineerd

function loadPrograms(data){ // case 3
    
    let programDiv = document.querySelector(`#programma`)

    // alle wedstrijden

    if(whichProgramLinkClicked == 1){ 
        programDiv.innerHTML = `<ul><h3>Programma</h3></ul>`
        programDiv = document.querySelector(`#programma ul:first-child`)

        poolId = data.objects[0].id
        
        // for(var t = 0; t < data.objects[0].standings.length; t++){
        //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[0].standings[t].team.name}<span>Rank: ${data.objects[1].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[1].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
        //     }
            console.log(`Pool B Data | `,data.objects[0])
    }else{

        poolId = data.objects[1].id

        programDiv.innerHTML = `<ul></ul>`
        programDiv = document.querySelector(`#programma ul:last-child`)
        // for(var t = 0; t < data.objects[1].standings.length; t++){
        //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[1].standings[t].team.name}<span>Rank: ${data.objects[1].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[1].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
        // }
        console.log(`Pool A Data | `,data.objects[1]) 
    }

    urlProgramsDone = `${apiURL}/v1/pool_rounds/?pool_id=${poolId}&starts_after=${enterTime}&order_by=%5Bstart_time%5D&access_token=` + getAccessToken();
    fetchData(urlProgramsDone)
    changeState("programsDone");
}

function loadProgramsDone(data){
    let programDiv = document.querySelector(`#programma`)

    // for(let i = 0; i < data.objects[i].length; i++){
    //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[i].standings[t].team.name}<span>Rank: ${data.objects[i].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[i].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
    // }

    console.log(data.objects)
}