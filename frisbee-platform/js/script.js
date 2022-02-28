// Login

const YOUR_CLIENT_ID = "ea52dfa1b062b4dd688206d2fd0a6c"
const client_secret = "57623563394553bad3db0138cfc242"
const response_type = "token"
const redirect_uri = "http://127.0.0.1:5500/frisbee-platform/"
const scope = "universal"

var endpoint = `https://www.leaguevine.com/oauth2/authorize/?client_id=${YOUR_CLIENT_ID}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`

document.querySelector("a").addEventListener("click", leagueLogin);

function leagueLogin(e){
    // console.log(e)
    window.location.href=`${endpoint}`
}

// Make api call

getAccesToken()

function getAccesToken(){
    fetch (`https://www.leaguevine.com/oauth2/token/?client_id=${YOUR_CLIENT_ID}&client_secret=${client_secret}&code=CODE&grant_type=authorization_code&redirect_uri=${redirect_uri}`)
    .then(response => {
        // indicates whether the response is successful (status code 200-299) or not
        if (!response.ok) {
          throw new Error(`Request failed with status ${reponse.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log(data.count)
        console.log(data.products)
      })
      .catch(error => console.log(error))
}



// function getAccesToken(){
//     fetch (`https://www.leaguevine.com/oauth2/token/?client_id=${YOUR_CLIENT_ID}
//     &client_secret=${client_secret}
//     &code=CODE
//     &grant_type=authorization_code
//     &redirect_uri=${redirect_uri}`)

//     // .then(response => {
//     //     if(!response.ok){
//     //         throw new Error(`Request failed with status ${reponse.status}`)
//     //     }
        
//     //     return response.json()
//     // })



// }

// function saveAccessToken(response){
// }

// fetch(endpoint) // get data asynchronously
// .then(function(response){
//     return response.json() // stream
// })

// .then(function(giphies){
//     //console.log(giphies)
//     for (var i = 0; i < 50; i++){
        
//     } 
// })