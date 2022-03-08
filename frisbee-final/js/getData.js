const apiURL = "https://api.leaguevine.com"
const origin = window.location.origin + `/frisbee-final/`

const apiTournament = `${apiURL}/v1/tournaments/`
const apiTournamentId = `[21291]`
const apiTournamentIdPool = `21291`
const apiTeams = `${apiURL}/v1/teams/`
const apiPools = `${apiURL}/v1/pools/`

const urlTournaments = apiTournament + `?tournament_ids=` + apiTournamentId + `&access_token=` + getAccessToken();
const urlPools = apiPools + `?tournament_id=${apiTournamentIdPool}`+ `&access_token=` + getAccessToken();

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
                
                // Je roept currentstate aan (regel 15)
                switch(currentState){
                    case "tournament":
                        // als currentstate tournament is > doe dan ...
                        loadTournaments(data) // en geef je data mee zodat het gelezen kan worden
                        break;
                    case "pools":
                        loadPools(data)
                        break;
                    case "programs":
                        loadPrograms(data)
                        break;
                }
            })
        }
        
    })
}

function changeState(newState){
    currentState = newState;
}

function loadTournaments(data){
    console.log(data);
    document.querySelector(`#intro a h2`).innerHTML = `${data.objects[0].name}`
    document.querySelector(`#intro a p:nth-child(3)`).innerHTML = `${data.objects[0].start_date} - ${data.objects[0].end_date}`
    document.querySelector(`#intro a p:nth-child(4)`).innerHTML = `${data.objects[0].season.name}`
    document.querySelector(`h1>a`).href=`${origin}`
}

function loadPools(data){
    const poolDiv = document.querySelector(`#pools`)

    console.log(data.objects)
    
    for(let i = 0; i < data.objects.length; i++){
        if(data.objects != ''){
            poolDiv.insertAdjacentHTML('beforeend',`<ul></ul>`)
            console.log(data.objects)
        }
    }

    let poolDivUl = document.querySelector(`#pools ul`)
    // console.log(poolDivUl)
    
    let ulCounter = 0

    data.objects.reverse() // A & B staan anders omgedraaid

    document.querySelector(`#intro a`).addEventListener("click",()=>{
        poolDiv.innerHTML = '';
       // document.querySelector(`#intro`).classList.add(`.disabled`)
    })

    for(let i = 0; i < data.objects.length; i++){
        if(ulCounter == 1){
            poolDivUl = document.querySelector(`#pools ul:last-child`)
        }
        if(data.objects != ''){
            poolDivUl.insertAdjacentHTML('beforeend',`<span>Pool ${data.objects[i].name}</span><a href="#programma" class="programChecker"><h3>Pool ${data.objects[i].name}</h3></a>`)
            console.log(poolDivUl)
            ulCounter++
            for(let t = 0; t < data.objects[i].standings.length; t++){
                poolDivUl.insertAdjacentHTML('beforeend',`<li>${data.objects[i].standings[t].team.name}</li>`)
            }
            poolDivUl.insertAdjacentHTML('beforeend',`<li>Bekijk het Programma</li>`)
        }
    }

    const programDiv = document.querySelector(`#programma`)
    document.querySelector(`.programChecker:first-of-type`).addEventListener("click", ()=>{
        console.log(data.objects[0])
        for(var t = 0; t < data.objects[0].standings.length; t++){
            programDiv.insertAdjacentHTML('beforeend',`<li>${data.objects[0].standings[t].team.name}</li>`)
        }
    })
    document.querySelector(`.programChecker:last-of-type`).addEventListener("click", ()=>{
        console.log(data.objects[1])
        for(var t = 0; t < data.objects[1].standings.length; t++){
            programDiv.insertAdjacentHTML('beforeend',`<li>${data.objects[1].standings[t].team.name}</li>`)
        }
    })
}

// if .pools>a#programma:first-child is clicked, haal dan data.object[0] op.

// Tournament klikbaar maken
document.querySelector(`#intro a`).addEventListener("click", ()=>{
    console.log(`klik op a`)
    fetchData(urlPools)
    // Als je hierop klikt, verander dan de currentstate naar Pools, dat verwijst terug terug naar je switch case
    changeState("pools");
})