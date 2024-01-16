"use strict";
const urlEpisodesOne = "https://rickandmortyapi.com/api/episode";
const urlEpisodesTwo = "https://rickandmortyapi.com/api/episode?page=2";
const urlEpisodesThree = "https://rickandmortyapi.com/api/episode?page=3";
fetch(urlEpisodesOne)
    .then(response => response.json())
    .then((data) => {
    data.results.forEach((episode) => {
        getEpisodes(episode);
    });
});
var Status;
(function (Status) {
    Status["Alive"] = "Alive";
    Status["Dead"] = "Dead";
    Status["Unknown"] = "Unknown";
})(Status || (Status = {}));
function getEpisodes(episode) {
    const listGroup = document.querySelector(".list-group");
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("first-episodes");
    li.textContent = episode.name;
    listGroup === null || listGroup === void 0 ? void 0 : listGroup.appendChild(li);
    li.addEventListener("click", () => {
        showEpisodeInfo(episode);
    });
}
const firstBtn = document.getElementById("moreEpisodesBtn");
const secondBtn = document.getElementById("lastEpisodesBtn");
const thirdBtn = document.getElementById("firstEpisodesBtn");
firstBtn === null || firstBtn === void 0 ? void 0 : firstBtn.addEventListener("click", () => {
    loadMoreEpisodes(urlEpisodesTwo);
    firstBtn === null || firstBtn === void 0 ? void 0 : firstBtn.classList.add("d-none");
    secondBtn === null || secondBtn === void 0 ? void 0 : secondBtn.classList.remove("d-none");
});
secondBtn === null || secondBtn === void 0 ? void 0 : secondBtn.addEventListener("click", () => {
    loadMoreEpisodes(urlEpisodesThree);
    secondBtn.classList.add("d-none");
    thirdBtn === null || thirdBtn === void 0 ? void 0 : thirdBtn.classList.remove("d-none");
});
thirdBtn === null || thirdBtn === void 0 ? void 0 : thirdBtn.addEventListener("click", () => {
    loadMoreEpisodes(urlEpisodesOne);
    thirdBtn.classList.add("d-none");
    firstBtn === null || firstBtn === void 0 ? void 0 : firstBtn.classList.remove("d-none");
});
function loadMoreEpisodes(url) {
    const firstEpisodes = document.querySelectorAll(".first-episodes");
    const firstEpisodesArray = Array.from(firstEpisodes);
    firstEpisodesArray.forEach((episode) => {
        episode.classList.add("d-none");
    });
    fetch(url)
        .then(response => response.json())
        .then((data) => {
        data.results.forEach((episode) => {
            getEpisodes(episode);
        });
    });
}
function showEpisodeInfo(episode) {
    console.log(episode.characters);
    const characterCard = document.getElementById("character-card");
    const centralDiv = document.getElementById("central-div");
    const episodeTitle = document.createElement("h3");
    const episodeDate = document.createElement("p");
    const episodeCode = document.createElement("p");
    episodeTitle.classList.add("episode-title");
    episodeDate.classList.add("episode-date");
    episodeCode.classList.add("episode-code");
    episodeTitle.textContent = episode.name;
    episodeDate.textContent = episode.air_date;
    episodeCode.textContent = episode.episode;
    centralDiv === null || centralDiv === void 0 ? void 0 : centralDiv.append(episodeTitle, episodeDate, episodeCode);
    const characters = episode.characters;
    characters.forEach((character) => {
        fetch(character)
            .then(response => response.json())
            .then((data) => paintCharactersInfo(data));
    });
    if (characterCard) {
        characterCard.innerHTML = "";
        console.log("dentro del if");
    }
}
function paintCharactersInfo(data) {
    console.log(data);
    const centralDiv = document.querySelector("#central-div");
    centralDiv === null || centralDiv === void 0 ? void 0 : centralDiv.classList.add("border");
    const divCharacter = document.createElement("div");
    divCharacter.classList.add("card", "card-custom");
    const img = document.createElement("img");
    img.src = data.image;
    img.classList.add("card-img-top");
    img.alt = data.name;
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const characterName = document.createElement("h5");
    characterName.textContent = data.name;
    const characterStatusAndSpecies = document.createElement("p");
    characterStatusAndSpecies.textContent = `${data.status} - ${data.species}`;
    centralDiv === null || centralDiv === void 0 ? void 0 : centralDiv.appendChild(divCharacter);
    divCharacter.appendChild(img);
    divCharacter.appendChild(cardBody);
    cardBody.append(characterName, characterStatusAndSpecies);
    divCharacter.addEventListener("click", () => {
        showMoreCharacterInfo(data, cardBody);
    });
}
function cleanCard() {
    const centralDiv = document.querySelector("#central-div");
    if (centralDiv) {
        centralDiv.innerHTML = "";
        console.log("show more character info");
    }
}
function cleanCard2() {
    const characterCard = document.getElementById("character-card");
    if (characterCard) {
        characterCard.innerHTML = "";
    }
}
function showMoreCharacterInfo(data, cardBody) {
    cleanCard();
    const centralDiv = document.querySelector("#central-div");
    centralDiv === null || centralDiv === void 0 ? void 0 : centralDiv.classList.remove("border");
    const characterMainInfo = document.getElementById("character-main-info");
    const characterEpisodes = document.getElementById("character-episodes");
    characterMainInfo === null || characterMainInfo === void 0 ? void 0 : characterMainInfo.classList.remove("d-none");
    characterEpisodes === null || characterEpisodes === void 0 ? void 0 : characterEpisodes.classList.remove("d-none");
    const characterPic = document.getElementById("character-pic");
    characterPic === null || characterPic === void 0 ? void 0 : characterPic.setAttribute("src", data.image);
    characterPic === null || characterPic === void 0 ? void 0 : characterPic.setAttribute("alt", data.name);
    const characterName = document.getElementById("character-name");
    const characterProperties = document.getElementById("character-properties");
    if (characterName && characterProperties) {
        characterName.textContent = data.name;
        characterProperties.textContent = `${data.status} | ${data.gender} | ${data.species}`;
        const episodesInShow = data.episode;
        console.log(episodesInShow[0]);
        episodesInShow.forEach((episode) => {
            fetch(episode)
                .then(response => response.json())
                .then((episode) => paintEpisodesinShow(episode));
        });
    }
    function paintEpisodesinShow(episode) {
        console.log(episode);
        const containerEpisodes = document.getElementById("character-episodes");
        const episodesInShow = document.createElement("div");
        episodesInShow.classList.add("col-md-3", "m-2", "bg-primary", "p-3", "text-white");
        episodesInShow.textContent = episode.name;
        containerEpisodes === null || containerEpisodes === void 0 ? void 0 : containerEpisodes.appendChild(episodesInShow);
    }
}
function cleanEpisodesinShow() {
    const containerEpisodes = document.getElementById("character-episodes");
    if (containerEpisodes) {
        containerEpisodes.innerHTML = "";
    }
}
//# sourceMappingURL=index.js.map