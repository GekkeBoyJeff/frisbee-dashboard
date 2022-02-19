// 1. variables (aka bindings), on top of global cope
var endpoint = 'https://api.giphy.com/v1/gifs/search?q=pokemon&api_key=jhcL7QPGb2ObrOHw1dEJuL9w2j71zfEk&limit=50&offset='
var offset = 0


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

const list = document.querySelector('body ul')

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