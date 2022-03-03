// Login

const YOUR_CLIENT_ID = "ea52dfa1b062b4dd688206d2fd0a6c"
const client_secret = "57623563394553bad3db0138cfc242"
const response_type = "token"
const redirect_uri = "http://127.0.0.1:5500/frisbee-platform/"
const scope = "universal"

const baseURL = "https://www.leaguevine.com"
const apiURL = "https://api.leaguevine.com"

var endpoint = `${baseURL}/oauth2/authorize/?client_id=${YOUR_CLIENT_ID}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`

document.querySelector("a").addEventListener("click", leagueLogin);

function leagueLogin(e){
    // console.log(e)
    window.location.href=`${endpoint}`
}

// get token from url

getUrlValue()

function getUrlValue(){
  const querystring = window.location.hash
  console.log(querystring)

  const urlParams = new URLSearchParams(querystring);

  const token = urlParams.get('#access_token')
  // console.log(token)

  let requestURL = `${apiURL}/v1/games/234/?access_token=${token}`

   fetchData(requestURL)
  // console.log({requestURL})
}

// Get data

function fetchData(requestURL){
  let response = fetch(`https://api.leaguevine.com/v1/leagues/?organization_id=2&access_token=403a293dd1`)

  const req_tournament_teams = "/v1/organizations/"

  //he fetch() method returns a Promise so you can use the then() and catch() methods to handle it:
  fetch(`https://api.leaguevine.com/v1/leagues/?organization_id=2&access_token=403a293dd1  `)
  .then(response => {
    console.log('correct', response)
    return response.json() // stream
  })
  .then(function tournaments(){
    // tournamentsData = tournaments.data
    console.log(tournaments.data)
  })
  .then(data => console.log(data))
  .catch(error => {
    console.log(' | er is iets fout gegaan | ', error) 
  })
}

/* When the request completes, the resource is available. At this time, the promise will resolve into a Response object.
The Response object is the API wrapper for the fetched resource. The Response object has a number of useful properties and methods to inspect the response. */


function sampledata(){

}