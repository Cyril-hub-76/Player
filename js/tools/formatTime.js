export function formatTime (time){
    let min = Math.floor(time / 60);
    if (min < 10){
        min = `0${min}`
    }
    let sec = Math.floor(time - (min * 60));
    if (sec < 10){
        sec = `0${sec}`
    }
    return `${min} : ${sec}`; 
}