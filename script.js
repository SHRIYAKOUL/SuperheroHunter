// public key = 5de5f51051b7b0c502a1b6f2fa330a73
// timestamp = 1694161207950
// hashValue="e8d33cf0051cf682545a1ee2f6783f22";
// privateKey = b41be63528259d85e85f5233364caf60ede7b3bf;
// script.js
let publicKey = "5de5f51051b7b0c502a1b6f2fa330a73";
let privateKey = "b41be63528259d85e85f5233364caf60ede7b3bf";

// Define a function to generate a hash value for the Marvel API request
function generateHash(timestamp, privateKey, publicKey) {
  // Concatenate the timestamp, private key, and public key
  let message = timestamp + privateKey + publicKey;
  // Generate an MD5 hash of the message
  let hash = CryptoJS.MD5(message).toString();
  // Return the hash value
  return hash;
}

// Get the input, button, and result elements from the HTML page
let input = document.getElementById("searchInput");
let button = document.getElementById("searchButton");
let showResult = document.getElementById("searchResult");
let listContainer = document.querySelector(".list");

// Define a function to display a value in the input element and remove any existing elements
function displayWords(value) {
  // Set the value of the input element
  input.value = value;
  // Remove any existing elements
  removeElements();
}

// Define a function to remove all elements from the list container
function removeElements() {
  // Set the innerHTML of the list container to an empty string
  listContainer.innerHTML = "";
}

function More_Details() {
  // Get the character name from the HTML element
  let characterName = document.querySelector(".character-name").textContent;
  
  // Generate the timestamp, hash, and URL for the API request
  const timestamp = new Date().getTime();
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&name=${characterName}`;

  // Make the API request
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Get the character data from the API response
      const character = data.data.results[0];
      
      // Get other information provided by the API (comics, events, series, stories, etc.)
      const comics = character.comics.items;
      const events = character.events.items;
      const series = character.series.items;
      const stories = character.stories.items;
      
      // Store the character data in local storage so it can be accessed by the new page
      localStorage.setItem('characterData', JSON.stringify(character));

      // Redirect to a new page in your application to display the additional details about the superhero in the same tab
      window.location.href = 'superheroDetails.html';
    });
}




// Add an event listener for when a key is released while the input element is focused
input.addEventListener("keyup", async () => {
  // Remove any existing elements from the list container
  removeElements();

  // Check if the length of the input value is less than 2 characters
  if (input.value.length < 2) {
    // If yes, return false to exit the function
    return false;
  }

  // Get the current timestamp in milliseconds
  let timestamp = new Date().getTime();

  // Generate a hash value for the Marvel API request
  let hashValue = generateHash(timestamp, privateKey, publicKey);

  // Construct the URL for the Marvel API request
  const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashValue}&nameStartsWith=${input.value}`;

  // Fetch data from the Marvel API
  const response = await fetch(url);
  // Parse the response as JSON data
  const jsonData = await response.json();
  // Loop through each result in the JSON data
  jsonData.data["results"].forEach((result) => {
    // Get the name of this result character
    let name = result.name;
    // Create a new div element for this result character
    let div = document.createElement("div");
    div.style.cursor = " pointer";
    div.classList.add("autocomplete-items");
    div.setAttribute("onclick", "displayWords('" + name + "')");
    let word = "<b>" + name.substr(0, input.value.length) + "</b>";
    word += name.substr(input.value.length);
    div.innerHTML = `<p class= "item">${word}</p>`;
    listContainer.appendChild(div);
  });
});

// Add an event listener for when the search button is clicked

   
button.addEventListener("click", (getResult = async () => {
  if (input.value.trim().length < 1) {
      alert("Input Can't be empty !");
  }
  else{
      removeElements();
      showResult.innerHTML = "";
      let timestamp = new Date().getTime();
      let hashValue = generateHash(timestamp, privateKey, publicKey);
      const url = `https://gateway.marvel.com:443/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hashValue}&name=${input.value}`;
      const response = await fetch(url);
      const jsonData = await response.json();
      jsonData.data["results"].forEach(element => {
          let characterName = element.name;
          let favouriteButtonLabel = "Add To Favourites";

          if (favourites.some(favourite => favourite.name === characterName)) {
              favouriteButtonLabel = "Added To Favourites";
          }

          showResult.innerHTML = `<div class="card-container">
              <div class="container-character-image">
                  <img src="${element.thumbnail["path"] + "." + element.thumbnail["extension"]}" />
              </div>
              <div class="character-name">${element.name}</div>
              <div class="character-description">${element.description}</div>
              <button id="moreDetailsButton" onclick="More_Details()">More Details</button>
              <button id="favouriteButton" onclick="favourite()">${favouriteButtonLabel}</button>
          </div>`;
      });
  }
}));