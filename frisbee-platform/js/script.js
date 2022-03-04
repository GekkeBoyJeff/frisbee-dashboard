// Login

const YOUR_CLIENT_ID = "ea52dfa1b062b4dd688206d2fd0a6c"
const client_secret = "57623563394553bad3db0138cfc242"
const response_type = "token"
const redirect_uri = "http://127.0.0.1:5500/frisbee-platform/"
const scope = "universal"

const baseURL = "https://www.leaguevine.com"
const apiURL = "https://api.leaguevine.com"

var beginpoint = `${baseURL}`
var endpoint = `${baseURL}/oauth2/authorize/?client_id=${YOUR_CLIENT_ID}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`

const loginBtn = document.querySelector("#login").addEventListener("click", leagueLogin);
const logoutBtn = document.querySelector("#logout").addEventListener("click", leagueLogout);

function leagueLogin(e){
    // console.log(e)
    window.location.href=`${endpoint}`
}

function leagueLogout(){
  window.location.href=`${redirect_uri}`
}
// get token from url

getUrlValue()

function getUrlValue(){
  const querystring = window.location.hash
  //console.log(querystring)
  return querystring;
  
}

checkLogin()

function checkLogin(){
  let url = window.location.href;
  if(url.includes('#access_token')){
    document.querySelector("#login").classList.add('hidden')
    document.querySelector("#logout").classList.add('show')
    getUrlToken()
  }else{
    console.log(url);
    document.querySelector("#login").classList.add('show')
    document.querySelector("#logout").classList.add('hidden')
  }
}



function getUrlToken(querystring){
  const urlParams = new URLSearchParams(querystring);
  const token = urlParams.get('#access_token')
  // console.log(token)

    let requestURL = `${apiURL}/v1/games/234/?access_token=${token}`

    fetchData(requestURL)
   // console.log({requestURL})
}

// Get data

function fetchData(){

  const leagueList = document.querySelector('#leagues')
  const tournooiList = document.querySelector('#tournooi')
  const teamsList = document.querySelector('#teams')

  // const req_tournament_teams = "/v1/organizations/"

  const offset = 0;

  //he fetch() method returns a Promise so you can use the then() and catch() methods to handle it:
  fetch(`https://api.leaguevine.com/v1/leagues/?offset=${offset}`
  // ,{
  //   method: `POST`, 
  //   headers: {
  //     'Content-Type' : 'application/json'
  //   },
  //   body: JSON.stringify({
      
  //   })
  // }
  // https://www.youtube.com/watch?v=cuEtnrL9-H0&ab_channel=WebDevSimplified
  )
  .then(res => {
    if(res.ok){
      console.log('connectie klopt')
      return res.json()
      .then(data => {
        for (var i = 0; i < 20; i++){
          console.log(data.objects)
          document.querySelector(`main section ul:first-child`).insertAdjacentHTML('beforeend', 
                `<li><a href="${data.objects[i].leaguevine_url}">
                    <img src="${data.objects[i].profile_image_50}" alt="${data.objects[i].name}">
                    <h2>${data.objects[i].name}</h2>
                    <p>${data.objects[i].sport}</p>
                    </a></li>`) 
        }
      })
    }
    else{
      console.log('connectie faalde')
    }
  }
  
  )
  
  .catch(error => {
    console.log(' | er is iets fout gegaan | ', error) // dit werkt echter alleen als je internet uit staat
  })
}

/* When the request completes, the resource is available. At this time, the promise will resolve into a Response object.
The Response object is the API wrapper for the fetched resource. The Response object has a number of useful properties and methods to inspect the response. */
