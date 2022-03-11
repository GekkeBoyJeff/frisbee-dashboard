import { origin } from "./getData.js"

const your_client_id = "bd6a6503bdcf6eaaa27b115fc38394"
const client_secret = "bd6a6503bdcf6eaaa27b115fc38394"
const response_type = "token"
const redirect_uri = "https://gekkeboyjeff.github.io/frisbee-dashboard/frisbee-final/"
const scope = "universal"

const loginBtn = document.querySelector("#loginBtn");
loginBtn.addEventListener("click", redirectLogin);

// doorlinken naar url om in te loggen
function redirectLogin(){
    window.location.href = `https://www.leaguevine.com/oauth2/authorize/?client_id=${your_client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;
}

// ik krijg van leaguevine data terug, daarvan pak ik de access_token
export function getAccessToken(){
    return window.sessionStorage.getItem('access_token')
}

// deze access_token sla ik op in token 
function saveAccessToken(token){
    window.sessionStorage.setItem('access_token', token);
}

// volledige website url ophalen uit de url bar
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
console.log(`access_token: `,getAccessToken());