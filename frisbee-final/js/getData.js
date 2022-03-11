const apiURL = "https://api.leaguevine.com"
const origin = window.location.origin + `/frisbee-final/`

const apiTournament = `${apiURL}/v1/tournaments/`
const apiTournamentId = `[21291]`
const apiTournamentIdPool = `21291`
const apiTeams = `${apiURL}/v1/teams/`
const apiPools = `${apiURL}/v1/pools/`

let poolId

const urlTournaments = apiTournament + `?tournament_ids=` + apiTournamentId + `&access_token=` + getAccessToken();
const urlPools = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
const urlPrograms = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
let urlProgramsDone
const urlPoolData = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();
let urlGames = `${apiURL}/v1/games/?pool_id=20787&order_by=%5Bstart_time%5D&limit=50&access_token=` + getAccessToken();

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
                        console.log(data)
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
                        console.log(data.objects)
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
            poolDivUl.insertAdjacentHTML('beforeend',`<span>Pool ${data.objects[i].name} teams</span><a href="#programma" class="programChecker"><h3>Pool ${data.objects[i].name}</h3></a>`)
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
    programDiv.innerHTML = `<ul><h3>Gespeelde wedstrijden</h3></ul>`
    // alle wedstrijden

    if(whichProgramLinkClicked == 1){ 
        
        programDiv = document.querySelector(`#programma ul>li:first-child`)

        poolId = data.objects[0].id
        
        // for(var t = 0; t < data.objects[0].standings.length; t++){
        //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[0].standings[t].team.name}<span>Rank: ${data.objects[1].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[1].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
        //     }
            console.table(data.objects[0])
            console.log(`Pool B Data | `,data.objects[0])
            
    }else{

        poolId = data.objects[1].id

        programDiv.innerHTML = `<ul><h3>Programma</h3></ul>`
        programDiv = document.querySelector(`#programma ul:last-child`)
        // for(var t = 0; t < data.objects[1].standings.length; t++){
        //     programDiv.insertAdjacentHTML('beforeend',`<ul><li>${data.objects[1].standings[t].team.name}<span>Rank: ${data.objects[1].standings[t].rank}</span></li><li>Wins: ${data.objects[1].standings[t].wins}</li><li>Ties: ${data.objects[1].standings[t].ties}</li><li>Losses: ${data.objects[1].standings[t].losses}</li></ul>`)
        // }
        console.table(`Pool A Data | `,data.objects[1]) 
    }

    urlProgramsDone = `${apiURL}/v1/pool_rounds/?pool_id=${poolId}&access_token=` + getAccessToken();
    console.log(urlProgramsDone)
    urlGames = `${apiURL}/v1/games/?pool_id=${poolId}&order_by=%5Bstart_time%5D&limit=50&access_token=` + getAccessToken();
    changeState("programsDone");
    fetchData(urlProgramsDone)
}

let gameStartTime

function loadProgramsDone(data){
    console.log(data.objects)

    changeState("gamedata");
    fetchData(urlGames)
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
// let gameTime

// console.log(currentTime_date + ' | voobeeld: 2022-03-04T09:00:00+01:00')

// let date2 = new Date(`2022-04-04T09:00:00`)
// let date = new Date(`2022-03-04T09:00:00`)

// if(date < date2 ){
//     console.log(`heyyyyyyyyyyyyyyyyy`)
// }

let days
let hours
let minutes

function timeComperator(){
    // ik kwam er later achter dat je de T niet hoeft te comparen

    let splittedCurT = currentTime_date.split(/[T+]/) // RegEx zodat je meerdere waarde mee kan geven

    // console.log(splittedCurT)
    splittedCurT.pop(); // laatste array item weghalen // timezone weghalen
   // [splittedCurT[0],splittedCurT[1]] = [splittedCurT[1],splittedCurT[0]]
    splittedCurT  = splittedCurT.join("T")
    // console.log(splittedCurT) // 2022-02-11T01:40:18

    splittedGameT = gameStartTime.split("+")
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


    // console.log(data.objects)

    // console.log(Object.entries(data.objects[forHolder].start_time))

    // if(forHolder = 0){
    //     console.table(data.objects[forHolder].start_time)
    //     console.log('JA')
    // }else{
    //     console.log('Nee')
    // }
    

    // let gamedate = data.objects[forHolder].start_time

    // let splittedGameT = gamedate.split(/[T+]/)
    // console.log(splittedGameT)

    //console.log(splittedCurT)
    // data.objects[i].start_time
}

function loadGames(data){
    programDiv = document.querySelector(`#programma`)
    programDiv.insertAdjacentHTML(`beforeend`, `<ul><h3>Huidige wedstrijden</h3></ul><ul><h3>Aankomende wedstrijden</h3></ul>`)
    for(let i = 0; i < data.objects.length; i++){
        programDiv = document.querySelector(`#programma>ul:first-child`)
        // waarde opslaan in een variabele werkt niet.

        // gametime = data.map(startTime => startTime.start_time)
        // map werkt ook niet lekker

        gameStartTime = data.objects[i].start_time
        timeComperator(data)

        if(hours > 2){ // Als de game al geweest is   
            console.log('Deze game is al geweest')
            console.log(data.objects)
            programDiv.insertAdjacentHTML('beforeend',`<li id="${data.objects[i].pool_round_id}"><a href="#result"><p>${data.objects[i].team_1.name}</p><p>vs</p><p>${data.objects[i].team_2.name}</p><ul><li>Team 1 score: ${data.objects[i].team_1_score}</li><li>Winner: ${data.objects[i].winner}</li><li>Team 2 score: ${data.objects[i].team_2_score}</li></ul></a></li>`)
        }
        
        else if(hours < 2 && hours >= 0){// Als de game nog niet is geweest
            console.log('Deze game nu bezig')    
            console.log(data.objects)
            programDiv = document.querySelector(`#programma ul:nth-child(2)`)
            programDiv.insertAdjacentHTML('beforeend',`<li id="${data.objects[i].pool_round_id}"><a href="#result"><p>${data.objects[i].team_1.name}</p><p>vs</p><p>${data.objects[i].team_2.name}</p><ul><li>Team 1 score: ${data.objects[i].team_1_score}</li><li>Winner: ${data.objects[i].winner}</li><li>Team 2 score: ${data.objects[i].team_2_score}</li></ul></a></li>`)
            
        }else if(hours < 0){
            console.log('Deze game is nog niet gespeeld')   
            console.log(data.objects)
            programDiv = document.querySelector(`#programma ul:nth-child(3)`)
            programDiv.insertAdjacentHTML('beforeend',`<li id="${data.objects[i].pool_round_id}"><a href="#result"><p>${data.objects[i].team_1.name}</p><p>vs</p><p>${data.objects[i].team_2.name}</p><ul><li>Team 1 score: ${data.objects[i].team_1_score}</li><li>Winner: ${data.objects[i].winner}</li><li>Team 2 score: ${data.objects[i].team_2_score}</li></ul></a></li>`)
        }

    }


}