const image = document.querySelectorAll('header img');

for (var i=0; i<image.length; i++)
{          
    const amount = i + 1;
    image[i].addEventListener('mouseover', function() {
        console.log('hey bitch');
        this.classList.add("hoverKleur");
        document.querySelector('#pokemoncards>li:nth-child('+amount+')').classList.add("flip");

    });
    image[i].addEventListener('mouseout', function() {
        console.log('bye felicia');
        this.classList.remove("hoverKleur");
        document.querySelector('#pokemoncards>li:nth-child('+amount+')').classList.remove("flip");

    });
}






