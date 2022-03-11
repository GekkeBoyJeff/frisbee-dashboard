<div>
    <a href="#">
    <img src="svgNotRelated/header.svg" width="100%" height="430" alt="geanimeerde header tekst waar 'Css projecten' in staat" style="object-fit: cover; border-radius: 10px;">
    </a>
</div>

## 💬 Quicklinks naar verslag

[Week 1](#week1) -
[Week 2](#week2) -
[Week 3](#week3) -
[Week 4](#week4)

##

<img src="src/tab1.png" alt="#" style="display:inline-flex; width:400px;"><img src="src/tab2.png" alt="#" style="display:inline-flex; width:400px;">

<img src="src/mob1.png" alt="#" style="display:inline-flex; width:400px;"><img src="src/mob2.png" alt="#" style="display:inline-flex; width:400px;">


## Beschrijving

Ik heb de opdracht Frisbee tournament gekozen. 

Wat heb ik mij vergist in de moeilijkheidsgraad van deze opdracht. Het hele systeem van het tournament snappen vereisde al heel veel denkwerk.
De API van LeagueVine is enorm complex, het is zo uitgebreid dat het onoverzichtelijk is. Ik vond dit enorm leervol maar vooral moeilijk en stressvol.

Het bouwen van een dashboard leek mij leuk omdat ik data wou inladen en hopelijk leren data terug te schrijven.

## Dit project installeren

### Clone deze repo

```$ gh repo clone GekkeBoyJeff/frisbee-dashboard```

De auth code word over je eigen interne ip adres van je locale server gestuurd.  ```127.0.0.1```

## Hoe gebruik je dit?

Je begint met het clonen van de applicatie. Als je jouw locale server wilt gebruiken moet je de redirect_uri in auth.js aanpassen naar 127.0.0.1
Je kan de web-app nu gebruiken zonder in te loggen. Echter als ik later heb toegevoegd dat je ook data kan toevoegen aan de web-app, zal je wel moeten inloggen.
Je kan door de app heen klikken om verschillende data op te halen. De resultaten pagina werkt (nog) niet. 

Wat je wel kan, is door de 'corona wappies' toernooi bladeren, hierin kan je zien welke pools er beschikbaar waren en welke teams tegen elkaar spelen, gaan spelen of al hebben gespeeld. daarbij kan je ook zien wat hun score is geworden

## Beginnen met de opdracht

Ik begon met het kijken naar welke data ik nou precies kon ophalen, echter kon ik mij niet registreren op hun website vanwege een error. Dit heeft verschillende weken geduurd maar uiteindelijk heb ik een account weten te bemachtigen waardoor ik hieraan kon werken. Tot die tijd 

<img src="src/internal-server-error.png">

Dus ben ik begonnen met onderzoek doen naar hoe heel het frisbee tournament in elkaar zit. Dit heeft mij veel tijd gekost deze week. Ik snapte het hele systeem erachter niet.

<img src="/src/frisbee-1.jpg" width="250px"><img src="/src/frisbee-2.jpg" width="250px"><img src="/src/frisbee-3.jpg" width="250px">

Nadat ik uitleg kreeg over de opdracht en hoe het systeem in elkaar zit leek het mij ook wel duidelijker.
Echter heb ik nog een week vastgezeten met hoe je de date kan ophalen, dit omdat je data via de OATH2 moest aanvragen en dat wou niet lukken voor een lange periode.

## API

Ik heb gebruik gemaakt van fetch om de data op te halen en terug te krijgen in een json format

```
function fetchData(url){
    fetch(url)
    .then(res =>{
        if(res.ok){
            return res.json()
            .then(data => {
                // hier kan je dingen gaan opvragen
            }
        }
    }
}
```
Je vraagt dus om een antwoord vanuit een URL, dat resultaat controleer je (response 200 hoop je altijd voor), zoja, dan kan je met .then dingen met je data doen.
Echter voordat ik dit waar kon maken had ik voor mijn applicatie een access_token nodig. 

### OAUTH2

Door middel van OAUTH2 heb ik toegang kunnen krijgen tot de applicatie.

```     window.location.href = 'https://www.leaguevine.com/oauth2/authorize/?client_id=${your_client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}'; ```

Dit linkte mij door naar hun website die data terug stuurde. Dan was het eerste probleem daarvan dat deze data terug kwam in je URL. Ik heb mijn URL 2 keer gesplit en de data die ik nodig had opgeslagen in mijn session storage. ``` window.sessionStorage.setItem('access_token', token); ```

Toen ik de access_token had bemachtigd heb ik ervoor gezorgd dat ik bij elke fetch deze code kan aanroepen.
### Render HTML

Het renderen van mijn HTML gaat eerst door mijn switch statement
```
    switch(currentState){
        case "tournament":
            // als currentstate tournament is > doe dan ...
            console.log(`state naar tournament`)
            loadTournaments(data) // en geef je data mee zodat het gelezen kan worden
            // console.log(data)
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
            // console.log(data.objects)
            break;
        case "gamedata":
            console.log('state naar gamedata')
            // console.log(data.objects)
            loadGames(data)
            break;
    }
```  

Op basis van mijn cases laat ik verschillende javascript modules die data inladen als volgt:

```
export function loadTournaments(data){ // case 1
    document.querySelector(`#intro a h2`).innerHTML = `${data.objects[0].name}`
    document.querySelector(`#intro a p:nth-child(3)`).innerHTML = `${data.objects[0].start_date} - ${data.objects[0].end_date}`
    document.querySelector(`#intro a p:nth-child(4)`).innerHTML = `${data.objects[0].season.name}`
    document.querySelector(`h1>a`).href=`${origin}`
}
```

## Gedaab + latere plannen <a name="checklist">
### Done
- [x] Data ophalen
- [x] Data renderen (Over de helft)
- [x] Internet error state
 
### Future plans
- [ ] Specifieke data tonen
- [ ] States
- [ ] De app afmaken (ook data uploaden)

<div id="week1">
    <a href="#">
    <img src="svgNotRelated/week1.svg" width="100%" height="230" alt="geanimeerde header tekst waar 'week 1' in staat" style="padding-bottom:-10px; font-size:32px; text-align:center; object-fit: cover; border-radius: 10px;">
    </a>
</div>

## 💬 Intro | Visitekaartje
In deze week heeft iedereen gewerkt aan het maken van een visitekaartje. Mijn visitekaartje is te vinden op deze pagina

Alhoewel de opdracht vrij simpel leek, verliep dit toch niet zonder enige slag of stoot. Vanaf dag 1 werd ons al verteld dat wij bij dit vak niet meer met javascript, classes en id's mochten werken als uitdaging. Dus de uitdaging lag bij het experimenteren met selectoren. Wij begonnen met het schetsen van ideeen voor andere klasgenoten.

De persoon die mijn kaartje mocht ontwerpen koos ervoor om tandwielen in mijn ontwerp te plaatsen, gezien het feit dat ik best technisch ben.
### Screenshots


Op dit blad zie je in het groot het ontwerp dat voor mij getekend was. 
daarboven en onder zijn schetsen die ik heb gemaakt om te itereren op dit ontwerp.


<img src="src/card1.jpg" style="display:inline-flex; width:300px;"><img src="src/card2.jpg" style="display:inline-flex; width:300px;">


Uiteindelijk koos ik ervoor om het tandwiel in het midden te plaatsen. 
Het tandwiel wou ik graag centraal houden omdat dit volgens mijn klasgenoot vond dat dat
bij mij hoorden.

Ik ben hier een tijd mee aan de slag gegaan maar kwam er niet uit hoe ik het tandwiel
kon maken. Ik dacht vanaf het begin al na hoe ik het zou laten draaien en hoe ik uberhaupt
de content zou plaatsen aangezien ik eigenlijk te weinig ruimte had ervoor.

Dus koos ik ervoor om het ontwerp compleet om te gooien, het tandwiel wou ik als klein
detail toevoegen aan het ontwerp maar wist niet niet hoe. Ik begon met het maken van mijn
tweede versie van het visitekaartje.

<img src="src/visitekaartje1.png" style="display:inline-flex; width:300px;">

Na heel even spelen met de code kwam ik hierop uit. Echter vond ik dit simpelweg niet mooi
en wist ik niet hoe ik dit mooier kon maken. Pinterest deed er niet heel goed op.

Hierdoor besloot ik over te stappen op het maken van een kaart. Dit had helemaal niets
te maken met het tandwiel maar het was iets wat ik wou maken. Echter na het maken van het
ontwerp liep ik al gouw vast op hoe ik het draaien / verschuiven van het kaartje
werkend kon krijgen. na veel googlen heb ik het soort van werkend gekregen.

<img src="src/visitekaartje2.png" style="display:inline-flex;"><img src="src/visitekaartje2-1.png" style="display:inline-flex;">

[Zie het visitekaartje](https://gekkeboyjeff.github.io/web-app-from-scratch-2122/week1/visitekaartje/)

##Teampagina: Geekotron

De hele klas is verdeeld in kleine groepjes zodat de leerlingen elkaar leren kennen. Ik werd ingedeeld bij Yolanda, Tim, Farrahton en Jeany. De groep gaat gelukkig goed met elkaar om en wellicht praten we iets te veel, maar dat zijn overige details.

Als groep kregen wij de opdracht om een groepspagina te maken. Deze moest doorlinken naar onze visitekaartjes.

Als eerst hebben we als groep ge-brainstormed over hoe wij de pagina eruit wouden laten zien. Hiervoor hebben wij een aantal schetsen gemaakt.

<img src="src/team-sketch-yolanda1.png" alt="#" style="display:inline-flex; width:250px;"><img src="src/team-sketch-yolanda2.png" alt="#" style="display:inline-flex; width:250px;"><img src="src/team-sketch-yolanda3.png" alt="#" style="display:inline-flex; width:250px;">

<img src="src/team-sketch-farrahton.jpg" alt="#" style="display:inline-flex; width:400px;"><img src="src/team-sketch-jeany.jpg" alt="#" style="display:inline-flex; width:400px;">

<img src="src/team-sketch-tim.jpg" alt="#" style="display:inline-flex; width:400px;"><img src="src/team-sketch1.jpg" alt="#" style="display:inline-flex; width:400px;">

Hieruit hebben wij uiteindelijk een nieuw ontwerp gemaakt, namelijk;

<img src="src/teamFinal.jpg" alt="#">

Wij hebben ondervonden dat wij allemaal wel iets nerdy/geeky hebben en pokemon/gamen leuk vinden. Daarom hadden wij besloten om een teampagina te maken die gebaseerd is op Pokemon.
Hieronder is een eerste versie te zien waarin wij aan het spelen waren met positionering en het draaien van de kaarten

<img src="src/teamV1.png" alt="#">

Nadat wij de kaarten konden laten draaien en de stijling een beetje op orde hadden konden wij een 2de versie samenvoegen. Wij hadden namelijk alle onderdelen van de pagina in kleine taken verdeeld zodat iedereen wat kon doen eraan.

<img src="src/finalFinalTeamPage.png" alt="#">

[Zie de teampagina](https://gekkeboyjeff.github.io/web-app-from-scratch-2122/week1/Geekotron/)

<div id="week2">
    <a href="#week1">
    <img src="svgNotRelated/week2.svg" width="100%" height="230" alt="geanimeerde header tekst waar 'week 1' in staat" style="padding-bottom:-10px; font-size:32px; text-align:center; object-fit: cover; border-radius: 10px;">
    </a>
</div>

## Oefenen met Api's

<img src="/src/test-api-home.png" alt="#">~Sneakpeak

Voordat ik me direct probeerde te verdiepen in de API van de opdracht, heb ik de oefenopdracht die sommige klasgenoten hadden gekregen zelf ook gedaan.

De oefenopdracht bestond uit het "scrapen" van afbeeldingen van giphy. je kreeg standaard uiterlijk 10 afbeeldingen die je kon oproepen vanwege een limiet. Dat vond ik problematisch omdat ik een ander idee in gedachten had toen ik dit zelf maakte. Maar goed het lukte me al vrij snel om verschillende types aan data op te halen en weer te geven:

Ik heb wel even moeite gehad met het uitzoeken hoe ik dat limiet kon aanpassen. Gelukkig kwam ik erachter dat je het limiet tot 50 kan uitbreiden door dit zoals eerder benoemd in de url zelf aan te passen.

```js
'https://api.giphy.com/v1/gifs/search?q=pokemon&api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=50'
```

Hetgene wat ik hierna wou doen was echter moeilijker. Ik wou namelijk knoppen maken om naar een volgende en vorige pagina te gaan. Ik las online wel dat mensen praatte over een offset maar dat zei me eigenlijk helemaal niets. Vanuit de data uit de API zag ik ook telkens 'pages' staan maar daar kon ik simpelweg niets over vinden. Ik was op een gegeven moment aan het opzoeken hoe ik die offset kon toepassen. Het heeft even geduurd voordat ik erachter kwam dat je dit dus ook in de url moet plaatsen. Maar goed dan was ik er nog niet. Ik moest de waarde in de urlnamelijk kunnen aanpassen. 

```js
var endpoint = 'https://api.giphy.com/v1/gifs/search?q=pokemon&api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=50&offset='
var offset = 0
```

dus ik heb de variabel aangemaakt (offset) die standaard op 0 staat. en die verander ik even later in mijn code.

Het inladen van de data ging gelukkig vrij gemakkelijk, daar heb ik weinig moeite bij gehad. Zoals je hieronder ziet loopt de code al iets voor op het 'pagineren' maar daar kom ik zo.

```js
// 2. the story
getData()
// 3. functions
function getData() {
    // 1. variables (aka bindings), on top of local scope
    const list = document.querySelector('body ul')
    // 2. the story
    fetch(endpoint + offset) // get data asynchronously
        .then(function(response){
            return response.json() // stream
        })
        .then(function(giphies){
            //console.log(giphies)
            for (var i = 0; i < 50; i++){
                giphdata = giphies.data;
                list.insertAdjacentHTML('beforeend', 
                `<li><a href="${giphdata[i].bitly_url}">
                    <img src="https://media.giphy.com/media/${giphdata[i].id}/giphy.gif" alt="${giphdata[i].title}">
                    <h2>${giphdata[i].title}</h2>
                    <a href="${giphdata[i].source}">Source</a>
                    </a></li>`) 
            } 
        })
}
```

Ik heb echter wel heel lang zitten strugglen met het toepassen van de offset in de url. maar goed uiteindelijk bleef het antwoord heel simpel, namelijk;

```js
document.querySelector('.next').addEventListener("click", function() {
        list.innerHTML = ''
        offset = offset + 50
        getData()
})

document.querySelector('.previous').addEventListener("click", function() {
    if(offset == 0){
        console.log('offset kan niet in de min');
    }else{
        list.innerHTML = ''
        offset = offset - 50
        getData()
    }
})
```