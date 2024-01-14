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

    type Episode = {
        name: string,
        air_date: string,
        episode: string,
        characters: string[],
    }

    type Character = {
        name: string,
        status: Status,
        species: string,
        gender: string,
        image: string,
        location: Locations,
        origin: Origin,
    }

    type Origin = {
        name: string,
        url: string,
    }
    type Locations = {
        name: string,
        type: string,
        dimension: string,
        url: string,
    }

    enum Status {
        Alive = "Alive",
        Dead = "Dead",
        Unknown = "Unknown"
    }

    function getEpisodes(episode:Episode){
        const listGroup = document.querySelector(".list-group");
        const li = document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("first-episodes");
        li.textContent = episode.name;
        listGroup?.appendChild(li)
        li.addEventListener("click", ()=>{
            showEpisodeInfo(episode)})
    }

    const firstBtn = document.getElementById("moreEpisodesBtn");
    const secondBtn = document.getElementById("lastEpisodesBtn");
    const thirdBtn = document.getElementById("firstEpisodesBtn");

    firstBtn?.addEventListener("click", ()=>{
        loadMoreEpisodes(urlEpisodesTwo)
        firstBtn?.classList.add("d-none");
        secondBtn?.classList.remove("d-none");
    });
    secondBtn?.addEventListener("click", ()=>{
        loadMoreEpisodes(urlEpisodesThree);
        secondBtn.classList.add("d-none");
        thirdBtn?.classList.remove("d-none");
    })
    thirdBtn?.addEventListener("click", ()=>{
        loadMoreEpisodes(urlEpisodesOne);
        thirdBtn.classList.add("d-none");
        firstBtn?.classList.remove("d-none");
    })
    function loadMoreEpisodes(url:string){
        const firstEpisodes = document.querySelectorAll(".first-episodes");
        const firstEpisodesArray = Array.from(firstEpisodes);
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

    function showEpisodeInfo(episode:Episode){
        console.log(episode.characters)
        cleanCard();
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
        centralDiv?.append(episodeTitle, episodeDate, episodeCode);
        
        const characters = episode.characters;
        characters.forEach((character:string)=>{
            fetch(character)
                .then(response => response.json())
                .then((data)=>paintCharactersInfo(data))
        })
    }

    function paintCharactersInfo(data:Character){
        console.log(data)
        const centralDiv = document.querySelector("#central-div");
        const divCharacter = document.createElement("div");
        divCharacter.classList.add("card");
        divCharacter.style.width = "18rem";
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
        // const characterGender = document.createElement("p");
        // characterGender.textContent = data.gender;
        centralDiv?.appendChild(divCharacter);
        divCharacter.appendChild(img);
        divCharacter.appendChild(cardBody);
        cardBody.append(characterName, characterStatusAndSpecies);

        let hasClicked = false;

        divCharacter.addEventListener("click", ()=>{
            if(!hasClicked){
                showMoreCharacterInfo(data, cardBody);
                hasClicked = true;
            }
            })
    }

    function cleanCard(){
        const centralDiv = document.querySelector("#central-div");
        if(centralDiv){
            centralDiv.innerHTML = "";
        }

    }
    
    function showMoreCharacterInfo(data:Character, cardBody:HTMLElement){
        console.log("dentro de showmorecharacterinfo");
            const characterGender = document.createElement("p");
            characterGender.textContent = data.gender;
            const characterOrigin = document.createElement("p");
            characterOrigin.textContent = `Origin: ${data.origin.name}`;
            cardBody?.append(characterGender, characterOrigin);
    }