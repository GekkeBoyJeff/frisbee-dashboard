import { changeState } from "./getData.js";
import { fetchData } from "./getData.js";
import { urlGames } from "./getData.js";

export function loadProgramsDone(data){
    // console.log(data.objects)

    changeState("gamedata");
    fetchData(urlGames)
}