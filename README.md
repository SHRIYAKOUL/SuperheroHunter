# SuperheroHunter

I have created a superhero hunter app by  using Vanilla javascript only .

Features--
  1. Home Page - 
      a) Fetch and display a SuperHero (Character) on the home page based on search result. Also search bar will filter out the character name list based on search query.
         Suppose I type “ba” in the search box, it should show all the characters name who start from prefix "ba" like “batman” and so on. 
         [ API example https://gateway.marvel.com:443/v1/public/characters?ts=<time-stamp>&apikey=<public-key>&hash=<md5(ts+privateKey+publicKey)>]
      b)  Each search result of the superhero have a favorite button, clicking on which superhero should be added to “ Favorite ” (a list).
      c) Each search result of the superhero have a More Details button, clicking on which open a new page with more information about that superhero (Superhero page).
     
  3. Superhero Page -
      Will show a lot of information about the superhero like their name, photo, bio and other information provided by the API (comics, events, series, stories, etc).

  4. Favourite (My favourite superhero page)-
      a) Display a list of all the favourite superheroes.
      b) This list is persistent (i.e. have the same number of superheroes before and after closing the browser).
      c) Remove from favourites button: Each superhero have remove from favourites button, clicking on which removes that superhero from the list.


