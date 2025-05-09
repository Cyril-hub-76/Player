import { fill } from "./tools/fillAlbumList.js";
import { createAudio } from "./tools/createAudio.js";
import { formatTime } from "./tools/formatTime.js";
import { formatTitle } from "./tools/formatTitle.js";
import { getCurrentIndex } from "./tools/getCurrentIndex.js";
import { highlightCurrentAlbum } from "./tools/highlightCurrentAlbum.js";
// Datas fetch
fetch("/js/datas/datas.json")
.then(resp => resp.json())
.then((data) => {
    displayAlbums(data)
})
.catch(e => console.error(`Error : ${e}`));

// buttons
let playButton = document.querySelector("img.play");
let pauseButton = document.querySelector("img.pause");
let forward = document.querySelector("img.forward");
let backward = document.querySelector("img.backward");
// time
let track = document.querySelector(".track");
track.type = "range";
track.step = "0.1";
let tracktime = document.querySelector(".tracktime");
let elapsed = document.querySelector(".elapsed");
// volume
let vol = document.querySelector(".volume");
vol.type = "range";
vol.min = "0";
vol.max = "1";
vol.step = "0.01";
vol.value = "0.5";
// title
let title = document.querySelector(".title");
title.innerHTML = "Welcome !!";
let titleTune = document.querySelector("title");
// sound
let rangeVol = document.querySelector(".rangeVol");
elapsed.innerHTML= "00 : 00";
tracktime.innerHTML = "00 : 00";
rangeVol.innerHTML = (`Vol ${Math.floor(vol.value * 100)} %`);

let container = document.querySelector(".container");
let containerHeight = container.offsetHeight;
let contentList = document.querySelector(".contentList");
let albumArray = [];

let displayAlbums = (array) => {
    array.forEach(element => {
        albumArray.push(element);
    });
    fill(albumArray, contentList, containerHeight);
};

container.addEventListener("scroll", () => {

    if (container.scrollTop + containerHeight === container.scrollHeight) {
    fill(albumArray, contentList, containerHeight);
    }
});

// volume audio handeling
vol.addEventListener("change", function(){
    audio.volume = vol.value;
    rangeVol.innerHTML = ("Vol " + Math.floor(vol.value * 100) + " %");
})

// audio handeling
let audio = document.querySelector(".audioElement");

contentList.addEventListener("click", (e) => {

    let albums = Array.from(contentList.children);
    let clickedAlbum = e.target.closest(".list");
    if (clickedAlbum && contentList.contains(clickedAlbum)) {

        createAudio(audio, clickedAlbum);

        // waiting the end of audio metadatas for displaying duration tune
        audio.onloadedmetadata = () => {
            tracktime.innerHTML = formatTime(audio.duration);
        };

        let titleContent = clickedAlbum.querySelector(".dataAlbum").textContent;
        title.innerHTML = formatTitle(titleContent);
        titleTune.innerHTML = formatTitle(titleContent);

        playTune();
        let currentIndex = getCurrentIndex(albums, audio);
        let currentAlbum = albums[currentIndex];
        highlightCurrentAlbum(currentAlbum, albums)
    }
});

playButton.addEventListener("click", ()=>{
    playTune();
});

pauseButton.addEventListener("click", ()=>{
    audio.pause();
    pauseButton.style.display="none";
    playButton.style.display="block";
});

let playTune = () => {
    playButton.style.display="none";
    pauseButton.style.display="block";
    audio.play();
};

track.addEventListener("change", function(){
    audio.currentTime = track.value;
});

forward.addEventListener("click", ()=>{
    let albums = Array.from(contentList.children);

    let currentIndex = getCurrentIndex(albums, audio);

    let nextIndex = (currentIndex + 1) % albums.length;

    let nextTune = albums[nextIndex];
    
    createAudio(audio, nextTune);
    highlightCurrentAlbum(nextTune, albums)
    
    let titleContent = nextTune.querySelector(".dataAlbum").textContent;
    title.innerHTML = formatTitle(titleContent);
    titleTune.innerHTML = formatTitle(titleContent);

    playTune();

})

backward.addEventListener("click", ()=>{
    let albums = Array.from(contentList.children);

    let currentIndex = getCurrentIndex(albums, audio);
    let prevIndex = (currentIndex - 1 + albums.length) % albums.length;
    let previousTune = albums[prevIndex];    
    createAudio(audio, previousTune);
    highlightCurrentAlbum(previousTune, albums)
    let titleContent = previousTune.querySelector(".dataAlbum").textContent;
    title.innerHTML = formatTitle(titleContent);
    titleTune.innerHTML = formatTitle(titleContent);
    
    playTune();
})
// loop playing
audio.addEventListener("play", ()=>{
    
    setInterval(()=>{
        if(audio.ended){
            forward.click();
        }
    }, 500)
})

setInterval(()=>{
    track.max = audio.duration;
    track.value = audio.currentTime;
    elapsed.value = elapsed.innerHTML = formatTime(audio.currentTime);
}, 500);
