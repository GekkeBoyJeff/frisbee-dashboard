import { fetchData } from "./getData.js"
import { urlPrograms } from "./getData.js"
import { changeState } from "./getData.js"
import { whichProgramLinkClicked } from "./getData.js"
export function loadPools(data){ // case 2
    const poolDiv = document.querySelector(`#pools`)
    
    for(let i = 0; i < data.objects.length; i++){
        if(data.objects != ''){
            poolDiv.insertAdjacentHTML('beforeend',`<ul></ul>`)
        }
    }

    let poolDivUl = document.querySelector(`#pools ul`)
    // console.log(poolDivUl)
    
    let ulCounter = 0

    // data.objects.reverse() // A & B staan anders omgedraaid

    document.querySelector(`#intro a`).addEventListener("click",()=>{
        poolDiv.innerHTML = '';
       // document.querySelector(`#intro`).classList.add(`.disabled`)
    })

    for(let i = 0; i < data.objects.length; i++){
        if(ulCounter == 1){
            poolDivUl = document.querySelector(`#pools ul:last-child`) // 2de ul
        }
        if(data.objects != ''){
            poolDivUl.insertAdjacentHTML('beforeend',`<span>Pool ${data.objects[i].name} teams</span><a href="#programma" class="programChecker"><h3>Pool ${data.objects[i].name}</h3></a>`)
            ulCounter++
            for(let t = 0; t < data.objects[i].standings.length; t++){
                poolDivUl.insertAdjacentHTML('beforeend',`<li>${data.objects[i].standings[t].team.name}</li>`)
            }
            poolDivUl.insertAdjacentHTML('beforeend',`<li>Bekijk het Programma</li>`)
        }
    } // einde pools

    const programChecker1 = document.querySelector(`#pools ul:first-child a`)
    const programChecker2 = document.querySelector(`#pools ul:last-child a`)

    programChecker1.addEventListener("click",()=>{
        fetchData(urlPrograms)
        changeState("programs");

        whichProgramLinkClicked = 1
    })
    programChecker2.addEventListener("click",()=>{
        fetchData(urlPrograms)
        changeState("programs");

        whichProgramLinkClicked = 2
    })

    


} // eind Loadpools