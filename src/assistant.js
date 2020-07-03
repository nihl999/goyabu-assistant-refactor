function showFavs(){
    const animeRegion = document.querySelector('#home-content');
    animeRegion.innerHTML = '';
    const regionTitle = document.createElement('h1');
    regionTitle.appendChild(document.createTextNode('Lista de favoritos: '));
    animeRegion.appendChild(regionTitle);
    animeRegion.appendChild(document.createElement('br'));
    chrome.storage.sync.get(['favorites'], function(favs) {
        if (favs.favorites.length == 0){
            const noAnimeLabel = document.createTextNode('Você nao tem animes favoritados!');
            const noAnimeNode = document.createElement('a');
            noAnimeNode.setAttribute('href', 'https://goyabu.com/');
            noAnimeNode.appendChild(noAnimeLabel);
            animeRegion.appendChild(noAnimeNode);
        } else {
            favs.favorites.forEach(anime => {
                const animeName = anime.nome;
                const animeLabel = document.createTextNode( animeName + '\n');
                const animeURL = anime.link;
                const animeNode = document.createElement('a');
                animeNode.setAttribute('href', animeURL);
                animeNode.appendChild(animeLabel);
                animeRegion.appendChild(animeNode);
                animeRegion.appendChild(document.createElement('br'));
    
        })};
        console.log(favs);
    });
};

const favList = () => new Promise((resolve) => {
    if (document.readyState == 'interactive' || document.readyState == 'complete'){
        const sideBar = document.querySelector('.sidebar-nav');
        const sideBarList = sideBar.querySelector('ul');
        const sideBarElement = sideBarList.querySelector('.lihead');
        const assistant = sideBarElement.cloneNode(true);
        assistant.querySelector('a').removeAttribute('href');
        assistant.querySelector('a').childNodes[1].nodeValue = 'Goyabu Assistant';
        assistant.querySelector('.material-icons').innerText = 'video_library';
        assistant.addEventListener('click', showFavs);
        sideBarList.appendChild(assistant);
    }
});

async function addButton(){
    await favList();
}

addButton();



