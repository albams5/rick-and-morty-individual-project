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
    Status["Alive"] = "ALIVE";
    Status["Dead"] = "DEAD";
    Status["Unknown"] = "UNKNOWN";
})(Status || (Status = {}));
console.log(Status.Unknown);
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
    cleanCard();
    const characterCard = document.getElementById("character-main-info");
    const characterEpisodes = document.getElementById("character-episodes");
    characterCard === null || characterCard === void 0 ? void 0 : characterCard.classList.add('d-none');
    characterEpisodes === null || characterEpisodes === void 0 ? void 0 : characterEpisodes.classList.add('d-none');
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
    divCharacter.append(img, cardBody);
    cardBody.append(characterName, characterStatusAndSpecies);
    divCharacter.addEventListener("click", () => {
        showMoreCharacterInfo(data);
    });
}
function cleanCard() {
    const centralDiv = document.querySelector("#central-div");
    if (centralDiv) {
        centralDiv.innerHTML = "";
    }
}
function showMoreCharacterInfo(data) {
    cleanCard();
    cleanEpisodesinShow();
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
    const characterGender = document.getElementById("character-gender");
    const characterSpecies = document.getElementById("character-species");
    const characterLocation = document.getElementById("character-location");
    if (characterName && characterProperties && characterGender && characterSpecies && characterLocation) {
        characterName.textContent = data.name;
        characterProperties.textContent = `Status: ${data.status}`;
        characterGender.textContent = `Gender: ${data.gender}`;
        characterSpecies.textContent = `Species: ${data.species}`;
        characterLocation.textContent = `Location: ${data.location.name}`;
    }
    characterLocation === null || characterLocation === void 0 ? void 0 : characterLocation.addEventListener("click", () => { showLocationInfo(); });
    const episodesInShow = data.episode;
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
    episodesInShow.classList.add("col-md-3", "m-2", "bg-primary", "p-3", "text-white", "div-episodes-custom");
    episodesInShow.textContent = episode.name;
    containerEpisodes === null || containerEpisodes === void 0 ? void 0 : containerEpisodes.appendChild(episodesInShow);
    episodesInShow.addEventListener("click", () => {
        showEpisodeInfo(episode);
    });
}
function cleanEpisodesinShow() {
    const containerEpisodes = document.getElementById("character-episodes");
    if (containerEpisodes) {
        containerEpisodes.innerHTML = "";
    }
}
function showLocationInfo() {
    console.log("dentro de location info");
}
//# sourceMappingURL=index.js.map