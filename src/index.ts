import { Episode, Character, Locations} from "./types";

const urlEpisodesOne = "https://rickandmortyapi.com/api/episode";
const urlEpisodesTwo = "https://rickandmortyapi.com/api/episode?page=2";
const urlEpisodesThree = "https://rickandmortyapi.com/api/episode?page=3";

fetch(urlEpisodesOne)
    .then(response => response.json())
    .then((data) => {
        data.results.forEach((episode:Episode)=>{
            getEpisodes(episode)
        })
    })

    function getEpisodes(episode:Episode):void{
        const listGroup = document.querySelector(".list-group") as HTMLElement;
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("first-episodes");
        li.textContent = episode.name;
        listGroup.appendChild(li)
        li.addEventListener("click", ()=>{
            showEpisodeInfo(episode)})
    }

    function loadMoreEpisodes(url:string):void{
        const firstEpisodes:NodeListOf<Element> = document.querySelectorAll(".first-episodes");
        const firstEpisodesArray:Element[] = Array.from(firstEpisodes);
        firstEpisodesArray.forEach((episode) =>{
            episode.classList.add("d-none");
        })
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                data.results.forEach((episode:Episode)=>{
                    getEpisodes(episode)
                })
            })
    }

    const firstBtn = document.getElementById("moreEpisodesBtn") as HTMLButtonElement;
    const secondBtn = document.getElementById("lastEpisodesBtn") as HTMLButtonElement;
    const thirdBtn = document.getElementById("firstEpisodesBtn") as HTMLButtonElement;

    firstBtn.addEventListener("click", ()=>{
        loadMoreEpisodes(urlEpisodesTwo)
        firstBtn.classList.add("d-none");
        secondBtn.classList.remove("d-none");
    });
    secondBtn.addEventListener("click", ()=>{
        loadMoreEpisodes(urlEpisodesThree);
        secondBtn.classList.add("d-none");
        thirdBtn.classList.remove("d-none");
    })
    thirdBtn.addEventListener("click", ()=>{
        loadMoreEpisodes(urlEpisodesOne);
        thirdBtn.classList.add("d-none");
        firstBtn.classList.remove("d-none");
    })

    function showEpisodeInfo(episode:Episode){
        cleanCard();
        showDivsCharacters();
        paintEpisodeInfo(episode);
        
        const characters = episode.characters;
        characters.forEach((character:string)=>{
            fetch(character)
                .then(response => response.json())
                .then((data)=>paintCharactersInfo(data))
        })
    }

    function showDivsCharacters(){
        const locationCard = document.getElementById("location-card") as HTMLDivElement;
        locationCard.classList.add("d-none");
        const characterCard = document.getElementById("character-main-info") as HTMLElement;
        const characterEpisodes = document.getElementById("character-episodes") as HTMLElement;
        characterCard.classList.add('d-none');
        characterEpisodes.classList.add('d-none');
    }

    function paintEpisodeInfo(episode:Episode){
        const centralDiv = document.getElementById("central-div") as HTMLDivElement;
        const episodeTitle = document.createElement("h3") as HTMLHeadingElement;
        const episodeDate = document.createElement("p") as HTMLParagraphElement;
        const episodeCode = document.createElement("p") as HTMLParagraphElement;

        episodeTitle.textContent = episode.name;
        episodeDate.textContent = episode.air_date;
        episodeCode.textContent = episode.episode;
        
        centralDiv?.append(episodeTitle, episodeDate, episodeCode);
    }

    function paintCharactersInfo(data:Character){
        cleanCharacterInfo();
        const centralDiv = document.querySelector("#central-div") as HTMLDivElement;
        centralDiv.classList.add("border");
        const divCharacter = createCharacterCard(data);
        centralDiv?.appendChild(divCharacter);

        divCharacter.addEventListener("click", () => {
            showMoreCharacterInfo(data);
        });
    }

    function createCharacterCard(data: Character): HTMLDivElement {
        const divCharacter = document.createElement("div") as HTMLDivElement;
        divCharacter.classList.add("card", "card-custom");
    
        const img = createCharacterImage(data.image, data.name);
        const cardBody = createCardBody(data);
    
        divCharacter.append(img, cardBody);
        return divCharacter;
    }
    
    function createCharacterImage(src: string, alt: string): HTMLImageElement {
        const img = document.createElement("img") as HTMLImageElement;
        img.src = src;
        img.classList.add("card-img-top");
        img.alt = alt;
        return img;
    }

    function createCardBody(data: Character): HTMLDivElement {
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
        const characterName = createCharacterElement("h5", data.name);
        const characterStatusAndSpecies = createCharacterElement("p", `${data.status} - ${data.species}`);
    
        cardBody.append(characterName, characterStatusAndSpecies);
        return cardBody;
    }
    
    function createCharacterElement(tag: string, textContent: string): HTMLElement {
        const element = document.createElement(tag);
        element.textContent = textContent;
        return element;
    }


    function cleanCard(){
        const centralDiv = document.querySelector("#central-div");
        if(centralDiv){
            centralDiv.innerHTML = "";
        }
    }

    function showMoreCharacterInfo(data:Character){
        cleanCard();
        cleanEpisodesinShow();
        hideLocationCard();
        resetCentralDiv();
        showCharacterMainInfo();
        updateCharacterPic(data);
        updateCharacterDetails(data);
    }

    function hideLocationCard() {
        const locationCard = document.getElementById("location-card") as HTMLDivElement;
        locationCard.classList.add("d-none");
    }
    
    function resetCentralDiv() {
        const centralDiv = document.querySelector("#central-div") as HTMLDivElement;
        centralDiv.classList.remove("border");
    
        const characterMainInfo = document.getElementById("character-main-info") as HTMLDivElement;
        const characterEpisodes = document.getElementById("character-episodes") as HTMLDivElement;
    
        characterMainInfo.classList.remove("d-none");
        characterEpisodes.classList.remove("d-none");
    }
    
    function showCharacterMainInfo() {
        const characterSpecies = document.getElementById("character-species") as HTMLParagraphElement;
        const characterLocation = document.getElementById("character-location") as HTMLParagraphElement;
    
        characterSpecies.classList.remove("d-none");
        characterLocation.classList.remove("d-none");
    }

    function updateCharacterPic(data: Character) {
        const characterPic = document.getElementById("character-pic") as HTMLHeadingElement;
        characterPic.setAttribute("src", data.image);
        characterPic.setAttribute("alt", data.name);
    }
    
    function updateCharacterDetails(data: Character) {
        const characterName = document.getElementById("character-name") as HTMLHeadingElement;
        const characterProperties = document.getElementById("character-properties") as HTMLParagraphElement;
        const characterGender = document.getElementById("character-gender") as HTMLParagraphElement;
        const characterSpecies = document.getElementById("character-species") as HTMLParagraphElement;
        const characterLocation = document.getElementById("character-location") as HTMLParagraphElement;
    
        characterName.textContent = data.name;
        characterProperties.textContent = `Status: ${data.status}`;
        characterGender.textContent = `Gender: ${data.gender}`;
        characterSpecies.textContent = `Species: ${data.species}`;
        characterLocation.textContent = `Origin: ${data.origin.name}`;
        
        if (!characterLocation?.onclick) {
            characterLocation?.addEventListener("click", () => {
                fetchLocationInfo(data.location);
            }, { once: true });
        }
        const episodesInShow:string[] = data.episode;
            episodesInShow.forEach((episode)=>{
                fetch(episode)
                .then(response => response.json())
                .then((episode)=>paintEpisodesinShow(episode))
            })
    }

    function paintEpisodesinShow(episode:Episode):void{
        const containerEpisodes = document.getElementById("character-episodes") as HTMLDivElement;
        const episodesInShow = document.createElement("div") as HTMLDivElement;
        episodesInShow.classList.add("col-md-3", "m-2", "bg-primary", "p-3", "text-white", "div-episodes-custom");
        const episodeName = document.createElement("p") as HTMLParagraphElement;
        episodeName.textContent = episode.name;
        const episodeCode = document.createElement("p") as HTMLParagraphElement;
        episodeCode.textContent = episode.episode;
        episodesInShow.append(episodeName, episodeCode);
        containerEpisodes?.appendChild(episodesInShow);
        
        episodesInShow.addEventListener("click", ()=>{
            showEpisodeInfo(episode)})
    }

    function cleanEpisodesinShow():void{
        const containerEpisodes = document.getElementById("character-episodes") as HTMLDivElement;
        containerEpisodes.innerHTML = "";
    }

    function cleanCharacterInfo():void{
        const characterMainInfo = document.getElementById("character-main-info") as HTMLDivElement;
        characterMainInfo.classList.add("d-none");
    }

    function fetchLocationInfo(data:Locations):void{
        const locationCard = document.getElementById("location-card") as HTMLDivElement;
        locationCard.classList.remove("d-none");
        fetch(data.url)
            .then(response => response.json())
            .then(data => paintLocationInfo(data))
    }

    function paintLocationInfo(data:Locations):void{
        cleanEpisodesinShow();
        cleanCharacterInfo();
        cleanLocationInfo();
        const locationName = document.getElementById("location-name") as HTMLHeadingElement;
        locationName.textContent = data.name;
        const locationType = document.getElementById("location-type") as HTMLParagraphElement;
        locationType.textContent = data.type;
        const locationDimension = document.getElementById("location-dimension") as HTMLParagraphElement;
        locationDimension.textContent = data.dimension;

        const residentsArray:string[] = data.residents;
        residentsArray.forEach((resident)=>{
            fetch(resident)
            .then(response => response.json())
            .then(data => paintCharactersInfo(data))
        })
    }

    function cleanLocationInfo():void{
        const locationCharacters = document.getElementById("central-div") as HTMLDivElement;
        locationCharacters.innerHTML = "";
    }