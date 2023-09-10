// Define an array to store the favorite characters
let favourites = [];

// Define a function to handle adding or removing a character from the favorites list
function favourite() {
  // Get the character name, image, and description from the HTML elements
  let characterName = document.querySelector(".character-name").textContent;
  let characterImage = document.querySelector(".container-character-image img").src;
  let characterDescription = document.querySelector(".character-description").textContent;
  
  // Get the favorite button element
  let favouriteButton = document.getElementById("favouriteButton");

  // Check if the favorite button text is "Add To Favourites"
  if (favouriteButton.textContent === "Add To Favourites") {
    // If yes, add the character to the favorites array
    favourites.push({
      name: characterName,
      image: characterImage,
      description: characterDescription
    });
    
    // Change the text of the favorite button to "Added To Favourites"
    favouriteButton.textContent = "Added To Favourites";
  } else {
    // If no, remove the character from the favorites array
    favourites = favourites.filter(favourite => favourite.name !== characterName);
    
    // Change the text of the favorite button to "Add To Favourites"
    favouriteButton.textContent = "Add To Favourites";
  }

  // Save the favorites array to the browser's local storage
  localStorage.setItem("favourites", JSON.stringify(favourites));
}

// Add an event listener for when the page loads
window.addEventListener("load", () => {
  // Load the favorites array from the browser's local storage
  favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Get the favorite list element
  let favouriteList = document.getElementById("favouriteList");

  // Loop through each favorite character
  favourites.forEach((favourite, index) => {
    // Create a new div element for this favorite character
    let favouriteItem = document.createElement("div");
    favouriteItem.classList.add("favourite-item");

    // Create an img element for this favorite character's image
    let favouriteImage = document.createElement("img");
    favouriteImage.src = favourite.image;

    // Create a div element for this favorite character's name
    let favouriteName = document.createElement("div");
    favouriteName.classList.add("favourite-name");
    favouriteName.textContent = favourite.name;

    // Create a div element for this favorite character's description
    let favouriteDescription = document.createElement("div");
    favouriteDescription.classList.add("favourite-description");
    favouriteDescription.textContent = favourite.description;

    // Create a button element to remove this favorite character from the favorites list
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove from Favourites";
    
    // Add an event listener for when this button is clicked
    removeButton.addEventListener("click", () => {
      // Remove this favorite character from the favorites array
      favourites.splice(index, 1);
      
      // Save the updated favorites array to the browser's local storage
      localStorage.setItem("favourites", JSON.stringify(favourites));
      
      // Reload the page to update the display of favorites
      window.location.reload();
    });

    // Append all elements to this favorite item div element
    favouriteItem.appendChild(favouriteImage);
    favouriteItem.appendChild(favouriteName);
    favouriteItem.appendChild(favouriteDescription);
    favouriteItem.appendChild(removeButton);

    // Append this favorite item div element to the favorite list element
    favouriteList.appendChild(favouriteItem);
  });
});
