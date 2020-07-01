/* function addFavs(){
    const favs = getFavs();
    const newAnime = getInfo();
    favs.push(newAnime);
    localStorage.setItem('favorites', JSON.stringify(favs));
}; */
function addFavs(){
    const newAnime = getInfo();
    chrome.storage.sync.get(['favorites'], function(favs) {
        if(favs.favorites.some(anime => anime.nome === newAnime.nome) == false)
            favs.favorites.push(newAnime);
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
}
const favList = () => new Promise((resolve) => {
    if (document.readyState == 'interactive' || document.readyState == 'complete'){
        const sideBar = document.querySelector('.sidebar-nav');
        const sideBarList = sideBar.querySelector('ul');
        const sideBarElement = sideBarList.querySelector('.lihead');
        const assistant = sideBarElement.cloneNode(true);
        assistant.querySelector('a').childNodes[1].nodeValue = 'Goyabu Assistant';
        assistant.querySelector('.material-icons').innerText = 'video_library';
        sideBarList.appendChild(assistant);


    }
});

async function addButton(){
    await favList();
}

addButton();



