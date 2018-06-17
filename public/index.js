var app = function(){

  const button = document.querySelector("#all-characters-button")
  button.addEventListener("click", function(){
    getCharacters();
  })

  const randombutton = document.querySelector("#random-character-button")
  randombutton.addEventListener("click", function(){
    getCharacter();
  })

}

const getCharacters = function () {
  url = "https://rickandmortyapi.com/api/character/";
  APIRequest(url, characterRequestComplete)
}

const getCharacter = function () {
  number = Math.floor((Math.random() * 493) + 1);
  url = "https://rickandmortyapi.com/api/character/" + number;
  APIRequest(url, singleCharacterResponse)
}

const singleCharacterResponse =  function(){
  if(this.status !== 200) return;
  character = JSON.parse(this.response);
  displaySingleCharacter(character);
}

const characterRequestComplete = function (){
  if(this.status !== 200) return;

  characters = JSON.parse(this.response);
  displayCharacters(characters);

  const nextCharactersButton = document.querySelector("#next-characters-button");
  const previousCharactersButton = document.querySelector("#previous-characters-button");

  nextCharactersButton.hidden = false;

  nextCharactersButton.addEventListener("click", function(){
    if(characters.info.next !== ""){
      APIRequest(characters.info.next, characterRequestComplete)
    } else{
      const div = document.querySelector("#characters-div")
      div.innerHTML = "";
      const pMessage = document.createElement("p");
      pMessage.textContent = "You have reached the end of the characters list"

    }
  })



}

const displayCharacters = function (characters) {
  const div = document.querySelector("#characters-div")
  div.innerHTML = "";

  characters.results.forEach(function(character){
      const characterDiv = document.createElement("div");
      const characterName = document.createElement("p");
      const characterStatus = document.createElement("p");
      const characterSpecies = document.createElement("p");
      const characterLocation = document.createElement("p");
      const characterOrigin = document.createElement("p");
      const characterimage = document.createElement("img");

      div.appendChild(characterDiv);
      characterDiv.appendChild(characterName);
      characterDiv.appendChild(characterStatus);
      characterDiv.appendChild(characterSpecies);
      characterDiv.appendChild(characterLocation);
      characterDiv.appendChild(characterOrigin);
      characterDiv.appendChild(characterimage);
      characterDiv.id = "character-div";

      characterName.textContent = character.name;
      characterStatus.textContent = character.status;
      characterSpecies.textContent = character.species;
      characterLocation.textContent = character.location.name;
      characterOrigin.textContent = character.origin.name;
      characterimage.src = character.image;

  })
}

const displaySingleCharacter =  function(character){
  const div = document.querySelector("#characters-div")
  div.innerHTML = "";

      const characterDiv = document.createElement("div");
      const characterName = document.createElement("p");
      const characterStatus = document.createElement("p");
      const characterSpecies = document.createElement("p");
      const characterLocation = document.createElement("p");
      const characterOrigin = document.createElement("p");
      const characterimage = document.createElement("img");

      div.appendChild(characterDiv);
      characterDiv.appendChild(characterName);
      characterDiv.appendChild(characterStatus);
      characterDiv.appendChild(characterSpecies);
      characterDiv.appendChild(characterLocation);
      characterDiv.appendChild(characterOrigin);
      characterDiv.appendChild(characterimage);
      characterDiv.id = "character-div";

      characterName.textContent = character.name;
      characterStatus.textContent = character.status;
      characterSpecies.textContent = character.species;
      characterLocation.textContent = character.location.name;
      characterOrigin.textContent = character.origin.name;
      characterimage.src = character.image;

}

const APIRequest = function (url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

window.addEventListener('load', app);
