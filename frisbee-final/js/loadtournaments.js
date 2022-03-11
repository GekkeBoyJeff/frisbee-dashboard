export function loadTournaments(data){ // case 1
    // console.log(`rournament data from fetch | `, data.objects[0]);
    document.querySelector(`#intro a h2`).innerHTML = `${data.objects[0].name}`
    document.querySelector(`#intro a p:nth-child(3)`).innerHTML = `${data.objects[0].start_date} - ${data.objects[0].end_date}`
    document.querySelector(`#intro a p:nth-child(4)`).innerHTML = `${data.objects[0].season.name}`
    document.querySelector(`h1>a`).href=`${origin}`
}