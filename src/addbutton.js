function addFavs(){
    const newAnime = getInfo();
    const favButton = document.querySelector('.favButton');
    chrome.storage.sync.get(['favorites'], function(favs) {
        if(favs.favorites.some(anime => anime.nome === newAnime.nome) == false){
            favs.favorites.push(newAnime);
            favButton.innerHTML = 'UNFAV';
        } else {
            const animeIndex = favs.favorites.indexOf(newAnime.nome);
            favs.favorites.splice(animeIndex, 1);
            favButton.innerHTML = 'FAV';
        };
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
const buttonValue = new Promise((resolve)=>{
    const newAnime = getInfo();
    chrome.storage.sync.get(['favorites'], function(favs) {
        if(favs.favorites.some(anime => anime.nome === newAnime.nome) == false){
            resolve('FAV')
        } else {
            resolve('UNFAV')
        }
    })
});

const buttonAdd = new Promise(()=>{
    if (document.readyState == 'interactive' || document.readyState == 'complete'){
        const animeInfoPlace = document.querySelector('.left20');
        const buttonPlace = animeInfoPlace.querySelector('p');
        const button = document.createElement('button');
        buttonValue.then(val => {
            button.appendChild(document.createTextNode(val));           
            button.addEventListener('click', addFavs);
            button.classList.add('favButton');
            buttonPlace.appendChild(button);
        })
    }
});

async function callPromise(requestedPromise){
    await requestedPromise;
};

callPromise(buttonAdd);





