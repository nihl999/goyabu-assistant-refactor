const body = document.body;
function reloadPage(){
    chrome.storage.sync.get(['favorites'], function(favs) {
        favs.favorites.forEach(anime => {
            const animeRegion = document.querySelector('.region');
            const animeName = anime.nome;
            const animeLabel = document.createTextNode( animeName + '\n');
            const animeURL = anime.link;
            const animeNode = document.createElement('a');
            animeNode.setAttribute('href', animeURL);
            animeNode.appendChild(animeLabel);
            animeRegion.appendChild(animeNode);
    
        });
        console.log(favs);
    });
};
setTimeout(reloadPage, 2000);