export function createAudio (audio, clickedAlbum) {

    if(!audio.paused) {
        audio.pause();
        audio.currenTime = 0;
    }
    let titleTune = clickedAlbum.getAttribute("data-slug");
    audio.src = `music/${titleTune}.mp3`;

}
