export function createListElement (song) {

    let list = document.createElement("div");
    let img = document.createElement("img");
    let dataAlbum = document.createElement("span");
    list.classList.add("list");
    img.src = `cover/${song["cover"]}.webp`;
    img.classList.add("thumb");
    list.setAttribute("data-slug", song["slug"]);
    list.appendChild(img);
    dataAlbum.classList.add("dataAlbum");
    dataAlbum.innerHTML = `${song["album_name"]} - ${song["artist"]}`;

    list.appendChild(dataAlbum);
    
    return list;
}
