console.log('test1');

// // shortcut voor de rest
//  var zoekHoverKleur = document.querySelector('.hoverKleur');



// zoekHoverKleur.addEventListener("click", function() {
//     console.log('test');
//     zoekHoverKleur.classList.add("hoverKleur");
// });


// image.addEventListener('mouseover', function() { 
//     image.setAttribute('style','-webkit-filter: brightness(1.5)'); 
// }, false);

// image.addEventListener('mouseout', function() { 
//     image.setAttribute('style','-webkit-filter: brightness(1.0)'); 
// }, false);


//var imageNodes = document.getElementsByTagName('img');

const image = document.querySelectorAll('img');
var a = "10";
console.log("test" + a);

for (var i=0; i<image.length; i++)
{          

    image[i].addEventListener('mouseover', function() {
        console.log('hey bitch');
        this.classList.add("hoverKleur");
        document.querySelector('.pokemoncard' + i).classList.add("flip");

    });
    image[i].addEventListener('mouseout', function() {
        console.log('bye felicia');
        this.classList.remove("hoverKleur");
        document.querySelector('.pokemoncard' + i).classList.remove("flip");

    });
}






