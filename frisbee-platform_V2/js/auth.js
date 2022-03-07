const YOUR_CLIENT_ID = "ea52dfa1b062b4dd688206d2fd0a6c"
const client_secret = "57623563394553bad3db0138cfc242"
const response_type = "token"
const redirect_uri = "http://127.0.0.1:5500/frisbee-platform/"
const scope = "universal"

const loginBtn = document.querySelector("#login");
loginBtn.addEventListener("click", redirectLogin);

// const logoutBtn = document.querySelector("#logout");
// logoutBtn.addEventListener("click", removeAccessToken);

function redirectLogin() {
    window.location.href = `https://www.leaguevine.com/oauth2/authorize/?client_id=${YOUR_CLIENT_ID}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;
}

function getAccessToken() {
    return window.sessionStorage.getItem('access_token');
}

function saveAccessToken(token) {
    window.sessionStorage.setItem('access_token', token);
}

// function removeAccessToken(){
//     sessionStorage.removeItem('access_token');
//     console.log(sessionStorage);
// }

// Volledige website URL ophalen van de huidige pagina
const url = window.location.href;

// Kijken of er een hashtag bestaat in de URL en hier op splitten de array ziet er dan als volgt uit:

/**
 * Voorbeeld: https://example.com/#access_token=101010&test=1
 * Waarde: ['https://example.com/test', 'access_token=101010&test=1']
 */
var urlQuery = url.split('#');

// Ik defineer nu het object waar de url query parameters als key => value wordt opgeslagen bijvoorbeeld:

/**
 * Voorbeeld: https://example.com/test#access_token=101010&test=1
 * Waarde: { access_token: 1001010, test: 1 }
 */

// Deze wordt overigens gevuld in regel 50 - 68

var formattedUrlQuery = {};

// Kijken of er een hashtag bestaat in de URL
if(typeof urlQuery[1] != 'undefined'){

    // Alle parameters splitten op de & teken zodat we alle url parameters los trekken
    var urlQueryParameters = urlQuery[1].split('&');

    // Voor elke parameter in de URL
    urlQueryParameters.forEach((parameter) => {

        // We halen hier de naam (key) van de parameter en de waarde (value) op
        var key = parameter.split('=')[0];
        var value = parameter.split('=')[1];

        // Deze stoppen we vervolgens in de door ons eerder genereerde object zodat we onze doel bereiken.
        formattedUrlQuery[key] = value;
    });
}

// Nu kijken we of de URL de parameter access_token heeft en slaan deze waarde op in een sessie zodat we deze altijd kunnen benaderen zolang deze bestaat..
if(typeof formattedUrlQuery.access_token != 'undefined') {
    saveAccessToken(formattedUrlQuery.access_token);

    // Vervolgens redirecten we naar de redirect_url zodat de URL weer schoon is en geen rare parameters heeft
    window.location.href = redirect_uri;

}

// Zo halen we de access token weer uit de sessie.
console.log(getAccessToken());

// loginBtn.classList.add('show')
// logoutBtn.classList.add('hidden')
// console.log('loginshow')

// loginBtn.classList.add('hidden')
// logoutBtn.classList.add('show')
// console.log('logoutshow')