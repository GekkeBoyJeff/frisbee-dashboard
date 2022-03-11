const apiURL = "https://api.leaguevine.com"

var offset = 0;

// var beginpoint = `${baseURL}`
// var endpoint = `${baseURL}/oauth2/authorize/?client_id=${YOUR_CLIENT_ID}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`

// const logoutBtn = document.querySelector("#logout").addEventListener("click", leagueLogout);

const apiLeague = `${apiURL}/v1/leagues/`
const apiTournament = `${apiURL}/v1/tournaments/`
const apiTeams = `${apiURL}/v1/teams/`
const apiPools = `${apiURL}/v1/pools/`
const apiBrackets = `${apiURL}/v1/brackets/`
const apiSeasons = `${apiURL}/v1/seasons/`

// function leagueLogin(e){
//     // console.log(e)
//     window.location.href=`${endpoint}`
// }

// function leagueLogout(){
//   window.location.href=`${redirect_uri}`
// }
// // get token from url

// getUrlValue()

// function getUrlValue(){
//   const querystring = window.location.hash
//   console.log(querystring) // URL Parameters
//   // return querystring;  

// }

// checkLogin() // hele slechte manier van in en uitloggen

// function checkLogin(){
//   let url = window.location.href;
//   if(url.includes('#access_token')){
//     document.querySelector("#login").classList.add('hidden')
//     document.querySelector("#logout").classList.add('show')
//     getUrlToken()
//   }else{
//     console.log(url);
//     document.querySelector("#login").classList.add('show')
//     document.querySelector("#logout").classList.add('hidden')
//   }
// }



// function getUrlToken(querystring){
//   const urlParams = new URLSearchParams(querystring);
//   const token = urlParams.get('#access_token')
//    console.log(token)

//     let requestURL = `${apiURL}/v1/games/234/?access_token=${token}`

//     rightUrlPicker
//     fetchData(rightUrlPicker()/*requestURL*/)
//     console.log(requestURL)
// }

// // Get data

// function rightUrlPicker(){
//   pickRightUrl = apiLeague + `?offset=` + offset
//   console.log(pickRightUrl)
//   return pickRightUrl
// }

fetchLeagueHome()

function fetchLeagueHome() {
  fetch(apiLeague + `?offset` + offset)
    // console.log()
    .then(response => {
      if (response.ok) {
        console.log('leagues ophalen gelukt | ' + response.status)
        return response.json()
          .then(data => {
            console.log(`leagues | `, data.objects) // array vol objecten/info
            // const ids = [] // array aanmaken voor het opvangen van de id's
            
            for (var i = 0; i < 20; i++) {
              document.querySelector(`#leagues`).insertAdjacentHTML('beforeend',
                `<li><a href="#seasons/${data.objects[i].id}">
                    <img src="${data.objects[i].profile_image_50}" alt="${data.objects[i].name}">
                    <h2>${data.objects[i].name}</h2>
                    <p>${data.objects[i].sport}</p>
                    </a></li>`) 
                    // ids.push(data.objects[i].id) // id in array stoppen

                    fetch(`${apiSeasons}?league_ids=[${data.objects[i].id}]&access_token=${getAccessToken()}`)
                    .then(response =>{
                      if(response.ok){
                        return response.json()
                        .then(seasonData => {
                          allSeasonData = seasonData.objects[0]
                          console.log(allSeasonData)
                          
                          for (var i = 0; i < 1; i++) {
                            document.querySelector(`#seasons`).insertAdjacentHTML('beforeend', `<li><a href="#">
                            <h2>${seasonData.objects[0].name}</h2></a></li>`)
                            console.log(seasonData.objects[0].league.name)
                            console.log(seasonData.objects[0].name)
                          }
                            // elke seasondata mag worden afgedrukt op basis van de vooraf gevonden id's. Echter moeten ze allemaal een # krijgen zodat ze weergeven kunnen worden met target
                        })
                      }
                    })
            }

            offsetBtnAdd()
          }
          )
      } else {
        console.log('connectie faalde')
      }
    })
    .catch(error => {
      console.log(' | er is iets fout gegaan | ', error) // dit werkt echter alleen als je internet uit staat
    })
}

fetchTournamentsHome()

// const tournooien = document.querySelector('header>ul>li:nth-child(2)')
// tournooien.addEventListener('click', fetchTournamentsHome)

function fetchTournamentsHome() {
  console.log('show tournooien')

  fetch(apiTournament + `?offset` + offset)
    // console.log()
    .then(response => {
      if (response.ok) {
        console.log('Tournaments ophalen gelukt | ' + response.status)
        return response.json()
          .then(data => {
            console.log(`tournaments | `,data.objects) // array vol objecten/info
            for (var i = 0; i < 20; i++) {
              document.querySelector(`#tournooi`).insertAdjacentHTML('beforeend',
                `<li><a href="${data.objects[i].leaguevine_url}">
                    <h2>${data.objects[i].name}</h2>
                    <p>${data.objects[i].info}</p>
                    </a></li>`)
            }
          })
      }
    })
}

// const teams = document.querySelector('header>ul>li:last-child')
// teams.addEventListener('click', fetchTeamsHome)

fetchTeamsHome()

function fetchTeamsHome() {
  console.log('show Teams')

  fetch(apiTeams + `?offset` + offset)
    // console.log()
    .then(response => {
      if (response.ok) {
        console.log('teams ophalen gelukt | ' + response.status)
        return response.json()
          .then(data => {
            console.log(`teams | `,data.objects) // array vol objecten/info
            for (var i = 0; i < 20; i++) {
              document.querySelector(`#teams`).insertAdjacentHTML('beforeend',
                `<li><a href="${data.objects[i].leaguevine_url}">
                    <h2>${data.objects[i].name}</h2>
                    <p>${data.objects[i].info}</p>
                    <p>Wins: ${data.objects[i].wins}</p>
                    <p>Ties: ${data.objects[i].ties}</p>
                    <p>Losses: ${data.objects[i].losses}</p>
                    </a></li>`)
            }
          })
      }
    })
}

// https://www.youtube.com/watch?v=cuEtnrL9-H0&ab_channel=WebDevSimplified

/* offset knoppen */

function offsetBtnAdd() {
  document.querySelector(`main section>ul:first-child`).insertAdjacentHTML(`afterend`, "<div><button id='previous'>Previous</button><button id='next'>Next</button><div>")

  // knoppen hier aanroepen omdat ze in deze functie worden aangemaakt
  document.querySelector("#next").addEventListener("click", offsetNext);

  previous = document.querySelector("#previous")
  previous.addEventListener("click", offsetPrev);
  previous.classList.add('disabled')
  if (!offset == 0) {
    previous.disabled = false;
    previous.classList.remove('disabled')
  }
}

/* Extra knoppen */

function offsetNext() {
  offset = offset + 20;
  removeUl()
  document.querySelector('section div').remove()
  fetchLeagueHome(fetchLeagueHome + `?offset=` + offset);
}

function offsetPrev() {
  if (offset !== 0) {
    offset = offset - 20;
    removeUl()
    document.querySelector('section div').remove()
    fetchLeagueHome(fetchLeagueHome + `?offset=` + offset);
  }
}



function removeUl() {
  document.querySelector('main section ul').innerHTML = ''
  document.querySelector('main section div').innerHTML = ''
}




/* When the request completes, the resource is available. At this time, the promise will resolve into a Response object.
The Response object is the API wrapper for the fetched resource. The Response object has a number of useful properties and methods to inspect the response. */
