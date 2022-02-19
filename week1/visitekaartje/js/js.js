// 2 classes selecteren, de slides zet ik in een array
const slider = document.querySelector('.slider-container'),
slides = Array.from(document.querySelectorAll('.slide'))


let isDragging = false,
startPos = 0,
currentTranslate = 0,
prevTranslate = 0,
animationID = 0,
currentIndex = 0

// voor elke .slides van slide word het opgeslagen in index
slides.forEach((slide, index) => {
    const slideImage = document.querySelector('img')
    //slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    slideImage.setAttribute("draggable", false);


    // touch events
    slide.addEventListener('touchstart', touchStart(index))
    slide.addEventListener('touchend', touchEnd)
    slide.addEventListener('touchmove', touchMove)



    // mouse events
    slide.addEventListener('mousedown', touchStart(index))
    slide.addEventListener('mouseup', touchEnd)
    slide.addEventListener('mouseleave', touchEnd)
    slide.addEventListener('mousemove', touchMove)

})

// context menu uitzetten
window.oncontextmenu = function(event){
    event.preventDefault()
    event.stopPropagation()
    return false
}

function touchStart(index){
    return function(event){
        currentIndex = index
        startPos = getPositionX(event)
        console.log(startPos)
        isDragging = true

        animationID = requestAnimationFrame(animation)
        //slider.classList.add('grabbing')
    }
}

function touchEnd(){
    isDragging = false;
    cancelAnimationFrame(animationID)

    const movedBy = currentTranslate - prevTranslate

    if(movedBy < -100 && currentIndex < slides.length - 1)
        currentIndex += 1

    if(movedBy > 100 && currentIndex > 0) 
        currentIndex -= 1

    setPositionByIndex()

    //slider.classList.remove('grabbing')

}

function touchMove(event){
    if(isDragging){
        const currentPosition = getPositionX(event)
        currentTranslate = prevTranslate + currentPosition - startPos
    }
}

function getPositionX(event){
    return event.type.includes('mouse') 
    ? event.pageX 
    : event.touches[0].clientX
}

function animation(){
    setSliderPosition()
    if(isDragging) requestAnimationFrame(animation)

    }

function setSliderPosition(){
    slider.style.transform = `translateX(${currentTranslate}px)`
}

function setPositionByIndex(){
    currentTranslate = currentIndex * -window.innerWidth
    prevTranslate = currentTranslate
    setSliderPosition()
}