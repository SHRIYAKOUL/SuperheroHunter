
// Get the character data from local storage
const character = JSON.parse(localStorage.getItem('characterData'));

// Get the character's name, photo, and bio
const characterName = character.name;
const photo = `${character.thumbnail.path}.${character.thumbnail.extension}`;
const bio = character.description;

// Get other information provided by the API (comics, events, series, stories, etc.)
const comics = character.comics.items;
const events = character.events.items;
const series = character.series.items;
const stories = character.stories.items;

// Create HTML elements to display the character's details
const nameElement = document.createElement('h2');
nameElement.textContent = character.name;

const photoElement = document.createElement('img');
photoElement.src = photo;

const bioElement = document.createElement('p');
bioElement.textContent = bio;

// Append the HTML elements to the page
const characterDetailsElement = document.getElementById('characterDetails');
characterDetailsElement.appendChild(nameElement);
characterDetailsElement.appendChild(photoElement);
characterDetailsElement.appendChild(bioElement);

// Create and append HTML elements for other information provided by the API (comics, events, series, stories, etc.)

// Comics
const comicsElement = document.createElement('div');
comicsElement.innerHTML = '<h3>Comics:</h3>';
const comicsListElement = document.createElement('ul');

comics.forEach(comic => {
    const comicItemElement = document.createElement('li');
    comicItemElement.textContent = comic.name;
    comicsListElement.appendChild(comicItemElement);
});

comicsElement.appendChild(comicsListElement);
characterDetailsElement.appendChild(comicsElement);

// Events
const eventsElement = document.createElement('div');
eventsElement.innerHTML = '<h3>Events:</h3>';
const eventsListElement = document.createElement('ul');

events.forEach(event => {
    const eventItemElement = document.createElement('li');
    eventItemElement.textContent = event.name;
    eventsListElement.appendChild(eventItemElement);
});

eventsElement.appendChild(eventsListElement);
characterDetailsElement.appendChild(eventsElement);

// Series
const seriesElement = document.createElement('div');
seriesElement.innerHTML = '<h3>Series:</h3>';
const seriesListElement = document.createElement('ul');

series.forEach(serie => {
    const serieItemElement = document.createElement('li');
    serieItemElement.textContent = serie.name;
    seriesListElement.appendChild(serieItemElement);
});

seriesElement.appendChild(seriesListElement);
characterDetailsElement.appendChild(seriesElement);

// Stories
const storiesElement = document.createElement('div');
storiesElement.innerHTML = '<h3>Stories:</h3>';
const storiesListElement = document.createElement('ul');

stories.forEach(story => {
    const storyItemElement = document.createElement('li');
    storyItemElement.textContent = story.name;
    storiesListElement.appendChild(storyItemElement);
});

storiesElement.appendChild(storiesListElement);
characterDetailsElement.appendChild(storiesElement);

