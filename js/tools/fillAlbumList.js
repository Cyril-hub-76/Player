import { createListElement } from "./createListItems.js";

export function fill (arr, contentList, containerHeight) {
    // Here we prepare element to append into the DOM to prevent reflow/repaint browser
    // Documentation : https://www.greenit.fr/2013/05/15/eco-conception-web-reduire-les-repaint-reflow/
    
    let fragment = document.createDocumentFragment();

    let divHeight = 70;
    let totalListHeight = 0;

    while(totalListHeight < (containerHeight + (divHeight * 10))) {
        let song = arr.shift();
        
        if (!song) break;
        let listItem = createListElement(song);

        fragment.appendChild(listItem);
        totalListHeight += divHeight;
    };

    contentList.appendChild(fragment);
    
};