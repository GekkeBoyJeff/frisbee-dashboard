const apiURL = "https://api.leaguevine.com"

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
                    case "teams":
                        loadTeams(data)
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
}

function loadPools(data){
    var poolDiv = document.querySelector(`#pools`)
    console.log(data.objects)
    //Reverse the loop so that the order is correct of the pools
    for(var i = data.objects.length - 1; i >= 0; i--){
        if(data.objects != ''){

            poolDiv.insertAdjacentHTML('beforeend',`<h3>Pool ${data.objects[i].name}</h3>`)
        }
    }
}

function loadTeams(data){
    
}

// Tournament klikbaar maken
document.querySelector(`#intro a`).addEventListener("click", ()=>{
    console.log(`klik op a`)
    fetchData(urlPools)
    // Als je hierop klikt, verander dan de currentstate naar Pools, dat verwijst terug terug naar je switch case
    changeState("pools");
})