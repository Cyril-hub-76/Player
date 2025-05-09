menu = document.querySelector('.menu');
menu.addEventListener("click", function(){
    menu.classList.toggle('turn');
});

list = document.querySelector('.dropdown');
menu.addEventListener("click", function(){
    list.classList.toggle('open');
});

let drop = document.querySelectorAll(".dropdown > div > li > a");
for (let i of drop) {
    i.addEventListener("click", function(){
        document.querySelector('.dropdown').classList.toggle('open');
        menu.classList.remove('turn');
    });
}
