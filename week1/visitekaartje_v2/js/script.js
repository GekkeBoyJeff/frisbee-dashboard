const slider = document.querySelector('.slider-cards'),
slides = Array.from(document.querySelectorAll('.slider-card'))
let isDown = false  // let omdat ze worden geupdate constant | vlag of ie true of false is ( of ie clickt of niet )

let startX;
let scrollLeft;

var count = 0; // gebruiken om slides bij te houden

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    // slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft; //zorgt dat de margin van de pagina niet word meeberekend
    scrollLeft = slider.scrollLeft; // voor als je in het midden wilt berekenen waar je scrollpositie is
    
    const x = e.pageX - slider.offsetLeft;
    // console.log({x, startX})
    const bewegen = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - bewegen;

    var minOrPlus = Math.sign(startX - x);
    var diff = Math.abs(startX - x);

    if( minOrPlus == -1 && diff > 20 && diff <= 21){
        console.log('-1')
        count++
        slider.insertAdjacentHTML('beforeend', 'asdsdaasd');

    }
    else if(minOrPlus == 1 && diff > 20 && diff <= 21){
        console.log('1')
    }
    else{
        console.log('test')
    }
});        
slider.addEventListener('mouseleave', () => {
    isDown = false;
    // slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
    isDown = false;
    // slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {

    if(!isDown) return; // fallback, mocht iemand tijdens het draggen de window uit gaan, stopt het.
    e.preventDefault(); // stopt text selecteren.
    const x = e.pageX - slider.offsetLeft;
    // console.log({x, startX})
    const bewegen = (x - startX) * 3;
    slider.scrollLeft = scrollLeft - bewegen;

    var minOrPlus = Math.sign(startX - x);
    var diff = Math.abs(startX - x);

    if( minOrPlus == -1 && diff > 20 && diff <= 21){
        console.log('-1')
        count++
        var asd = document.querySelectorAll('h1')
    }
    else if(minOrPlus == 1 && diff > 20 && diff <= 21){
        console.log('1')
    }
    else{
        
    }
})

// Schijnbaar werkt dit niet op telefoons :V | Element.setCapture() is verouderd

// als x 20 hoger heeft dan startX, doe dan dit...



/*  

Idee:
Standaard active1 class aan de eerste slide. (voor active state)
Als je meer dan 20px één kant op schuift, verander de x positie van slider.
Als de positie van de slider tussen zoveel pixels zit, verander dan de class van de UL onderin (visability:0)
while loop? x



*/