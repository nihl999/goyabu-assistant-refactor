function addFavs(){
    const newAnime = getInfo();
    chrome.storage.sync.get(['favorites'], function(favs) {
        if(favs.favorites.some(anime => anime.nome === newAnime.nome) == false){
            favs.favorites.push(newAnime);
            const favButton = document.querySelector('.favButton');
            favButton.innerHTML = 'UNFAV';
            favButton.style.width = '60px';
        } else {};
        console.log(favs);
        chrome.storage.sync.set({favorites: favs.favorites});
    });
};
function getInfo(){
    const animeLabel = document.querySelector('.left20');
    const animeName = animeLabel.querySelector('h1').innerText;
    const animeURL = location.href;
    const animeData = {
        nome: animeName,
        link: animeURL
    }
    return animeData;
};

const buttonAdd = () => new Promise(()=>{
    if (document.readyState == 'interactive' || document.readyState == 'complete'){
        const animeInfoPlace = document.querySelector('.left20');
        const buttonPlace = animeInfoPlace.querySelector('p');
        const button = document.createElement('button');
        button.appendChild(document.createTextNode('FAV'));
        button.addEventListener('click', addFavs);
        button.classList.add('favButton');
        buttonPlace.appendChild(button);
    }
})
async function callPromise(){
    await buttonAdd();
}

callPromise();





