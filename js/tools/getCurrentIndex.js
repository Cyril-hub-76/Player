export function getCurrentIndex(albums, audio){

    const fileName = audio.src.split("/").pop().replace(".mp3", "");
    return albums.findIndex( tune =>
        tune.getAttribute("data-slug") === fileName
    );
}