export function highlightCurrentAlbum(album, albums )
{
    albums.forEach(tune => {
        tune.classList.remove("active");
    });
    album.classList.add("active")
}