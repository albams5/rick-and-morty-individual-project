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
function getEpisodes(episode) {
    const listGroup = document.querySelector(".list-group");
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("first-episodes");
    li.textContent = episode.name;
    listGroup.appendChild(li);
    li.addEventListener("click", () => {
        showEpisodeInfo(episode);
    });
}
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
const firstBtn = document.getElementById("moreEpisodesBtn");
const secondBtn = document.getElementById("lastEpisodesBtn");
const thirdBtn = document.getElementById("firstEpisodesBtn");
firstBtn.addEventListener("click", () => {
    loadMoreEpisodes(urlEpisodesTwo);
    firstBtn.classList.add("d-none");
    secondBtn.classList.remove("d-none");
});
secondBtn.addEventListener("click", () => {
    loadMoreEpisodes(urlEpisodesThree);
    secondBtn.classList.add("d-none");
    thirdBtn.classList.remove("d-none");
});
thirdBtn.addEventListener("click", () => {
    loadMoreEpisodes(urlEpisodesOne);
    thirdBtn.classList.add("d-none");
    firstBtn.classList.remove("d-none");
});
function showEpisodeInfo(episode) {
    cleanCard();
    showDivsCharacters();
    paintEpisodeInfo(episode);
    const characters = episode.characters;
    characters.forEach((character) => {
        fetch(character)
            .then(response => response.json())
            .then((data) => paintCharactersInfo(data));
    });
}
function showDivsCharacters() {
    const locationCard = document.getElementById("location-card");
    locationCard.classList.add("d-none");
    const characterCard = document.getElementById("character-main-info");
    const characterEpisodes = document.getElementById("character-episodes");
    characterCard.classList.add('d-none');
    characterEpisodes.classList.add('d-none');
}
function paintEpisodeInfo(episode) {
    const centralDiv = document.getElementById("central-div");
    const episodeTitle = document.createElement("h3");
    const episodeDate = document.createElement("p");
    const episodeCode = document.createElement("p");
    episodeTitle.textContent = episode.name;
    episodeDate.textContent = episode.air_date;
    episodeCode.textContent = episode.episode;
    centralDiv === null || centralDiv === void 0 ? void 0 : centralDiv.append(episodeTitle, episodeDate, episodeCode);
}
function paintCharactersInfo(data) {
    cleanCharacterInfo();
    const centralDiv = document.querySelector("#central-div");
    centralDiv.classList.add("border");
    const divCharacter = createCharacterCard(data);
    centralDiv === null || centralDiv === void 0 ? void 0 : centralDiv.appendChild(divCharacter);
    divCharacter.addEventListener("click", () => {
        showMoreCharacterInfo(data);
    });
}
function createCharacterCard(data) {
    const divCharacter = document.createElement("div");
    divCharacter.classList.add("card", "card-custom");
    const img = createCharacterImage(data.image, data.name);
    const cardBody = createCardBody(data);
    divCharacter.append(img, cardBody);
    return divCharacter;
}
function createCharacterImage(src, alt) {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("card-img-top");
    img.alt = alt;
    return img;
}
function createCardBody(data) {
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const characterName = createCharacterElement("h5", data.name);
    const characterStatusAndSpecies = createCharacterElement("p", `${data.status} - ${data.species}`);
    cardBody.append(characterName, characterStatusAndSpecies);
    return cardBody;
}
function createCharacterElement(tag, textContent) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    return element;
}
function cleanCard() {
    const centralDiv = document.querySelector("#central-div");
    centralDiv.innerHTML = "";
}
function showMoreCharacterInfo(data) {
    cleanCard();
    cleanEpisodesinShow();
    resetCentralDiv();
    hideLocationCard();
    showCharacterMainInfo();
    updateCharacterPic(data);
    updateCharacterDetails(data);
}
function hideLocationCard() {
    const locationCard = document.getElementById("location-card");
    locationCard.classList.add("d-none");
}
function resetCentralDiv() {
    const centralDiv = document.querySelector("#central-div");
    centralDiv.classList.remove("border");
    const characterMainInfo = document.getElementById("character-main-info");
    const characterEpisodes = document.getElementById("character-episodes");
    characterMainInfo.classList.remove("d-none");
    characterEpisodes.classList.remove("d-none");
}
function showCharacterMainInfo() {
    const characterSpecies = document.getElementById("character-species");
    const characterLocation = document.getElementById("character-location");
    characterSpecies.classList.remove("d-none");
    characterLocation.classList.remove("d-none");
}
function updateCharacterPic(data) {
    const characterPic = document.getElementById("character-pic");
    characterPic.setAttribute("src", data.image);
    characterPic.setAttribute("alt", data.name);
}
function updateCharacterDetails(data) {
    const characterName = document.getElementById("character-name");
    const characterProperties = document.getElementById("character-properties");
    const characterGender = document.getElementById("character-gender");
    const characterSpecies = document.getElementById("character-species");
    const characterLocation = document.getElementById("character-location");
    characterName.textContent = data.name;
    characterProperties.textContent = `Status: ${data.status}`;
    characterGender.textContent = `Gender: ${data.gender}`;
    characterSpecies.textContent = `Species: ${data.species}`;
    characterLocation.textContent = `Origin: ${data.origin.name}`;
    if (!(characterLocation === null || characterLocation === void 0 ? void 0 : characterLocation.onclick)) {
        characterLocation === null || characterLocation === void 0 ? void 0 : characterLocation.addEventListener("click", () => {
            fetchLocationInfo(data.location);
        }, { once: true });
    }
    const episodesInShow = data.episode;
    episodesInShow.forEach((episode) => {
        fetch(episode)
            .then(response => response.json())
            .then((episode) => paintEpisodesinShow(episode));
    });
}
function paintEpisodesinShow(episode) {
    const containerEpisodes = document.getElementById("character-episodes");
    const episodesInShow = document.createElement("div");
    episodesInShow.classList.add("col-md-3", "m-2", "bg-primary", "p-3", "text-white", "div-episodes-custom");
    const episodeName = document.createElement("p");
    episodeName.textContent = episode.name;
    const episodeCode = document.createElement("p");
    episodeCode.textContent = episode.episode;
    episodesInShow.append(episodeName, episodeCode);
    containerEpisodes === null || containerEpisodes === void 0 ? void 0 : containerEpisodes.appendChild(episodesInShow);
    episodesInShow.addEventListener("click", () => {
        showEpisodeInfo(episode);
    });
}
function cleanEpisodesinShow() {
    const containerEpisodes = document.getElementById("character-episodes");
    containerEpisodes.innerHTML = "";
}
function cleanCharacterInfo() {
    const characterMainInfo = document.getElementById("character-main-info");
    characterMainInfo.classList.add("d-none");
}
function fetchLocationInfo(data) {
    const locationCard = document.getElementById("location-card");
    locationCard.classList.remove("d-none");
    fetch(data.url)
        .then(response => response.json())
        .then(data => paintLocationInfo(data));
}
function paintLocationInfo(data) {
    cleanEpisodesinShow();
    cleanCharacterInfo();
    cleanLocationInfo();
    const locationName = document.getElementById("location-name");
    locationName.textContent = data.name;
    const locationType = document.getElementById("location-type");
    locationType.textContent = data.type;
    const locationDimension = document.getElementById("location-dimension");
    locationDimension.textContent = data.dimension;
    const residentsArray = data.residents;
    residentsArray.forEach((resident) => {
        fetch(resident)
            .then(response => response.json())
            .then(data => paintCharactersInfo(data));
    });
}
function cleanLocationInfo() {
    const locationCharacters = document.getElementById("central-div");
    locationCharacters.innerHTML = "";
}
export {};
//# sourceMappingURL=index.js.map