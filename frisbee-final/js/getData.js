const apiURL = "https://api.leaguevine.com"

const apiTournament = `${apiURL}/v1/tournaments/`
const apiTournamentId = `[21291]`
const apiTeams = `${apiURL}/v1/teams/`
const apiPools = `${apiURL}/v1/pools/`

fetchTournament()

function fetchTournament(){
    fetch(apiTournament + `?tournament_ids=` + apiTournamentId + `&access_token=` + getAccessToken())
    .then(res =>{
        if(res.ok){
            console.log('specifiek tournament ophalen gelukt | ' + res.status)
            return res.json()
            .then(data => {
                console.log(`tournament | ` , data.objects[0])
                document.querySelector(`#intro a h2`).innerHTML = `${data.objects[0].name}`
                document.querySelector(`#intro a p:nth-child(3)`).innerHTML = `${data.objects[0].start_date} - ${data.objects[0].end_date}`
                document.querySelector(`#intro a p:nth-child(4)`).innerHTML = `${data.objects[0].season.name}`
            })
        }
    })
}