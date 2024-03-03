const searchBox = document.querySelector("#movie-search-box"); //input from user using search box
const searchList = document.querySelector("#search-list"); // search suggestion box List
const resultGrid = document.querySelector("#result-grid"); // result container grid from movie page to display details of particular movie

// Set default data to localstorage
if (!localStorage.getItem("favMovies")) {
  let favMovies = [];
  localStorage.setItem("favMovies", JSON.stringify(favMovies));
}

//Find Movies for the user
const findMovies = () => {
  let searchTerm = searchBox.value.trim(); // Get typed value in search box and remove whitespace

  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list"); // show the suggestion box List
    fetchMovies(searchTerm); //Load movies from API according to the user entered movie title in search box
  } else {
    searchList.classList.add("hide-search-list"); // Hide the suggestion box List if no character is present in the search box
  }
};

// Fetching Movie Names from OMDB Server API using Key
async function fetchMovies(searchTerm) {
  const URL = `http://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=5af17480`;
  const response = await fetch(`${URL}`); //Fetching data from OMDB server
  const data = await response.json(); //convert data to readable format (Here JSON Format)

  if (data.Response == "True") {
    displayMoviesList(data.Search);
  }
}

// Displaying Matched Movie Names in the suggestions box List
const displayMoviesList = (movies) => {
  searchList.innerHTML = ""; //clear the earlier list of movies

  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div"); // Create a Div
    movieListItem.dataset.id = movies[i].imdbID; // Set Id to each movie result
    movieListItem.classList.add("search-list-item"); //Adding 'search-list-item' class to this 'div'

    //Set poster image
    if (movies[i].Poster != "N/A") {
      moviePoster = movies[i].Poster; // Set image poster found then set particular movie poster
    } else {
      moviePoster = "images/notFound.png"; //If image not found then set notFound image
    }

    //Add results to suggestions box list
    movieListItem.innerHTML = `
        <div class="search-item-thumbnail"> 
            <img src="${moviePoster}" alt="movie">
        </div>

        <div class="search-item-info">
            <h3>${movies[i].Title}</h3>
            <p>${movies[i].Year}</p>
        </div>
        `;

    searchList.appendChild(movieListItem); //Add a matched movie to autocomplete list
  }

  loadMovieDetails(); //Load movie details
};

//Loading Movie details
const loadMovieDetails = () => {
  const searchListMovies = searchList.querySelectorAll(".search-list-item"); //Select all Matched movies

  //Add all Matched movies to suggestion box
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list"); //Add CSS
      searchBox.value = ""; //Reset search box

      localStorage.setItem("movieID", movie.dataset.id); // Set movie id to localstorage to use it in movie.html

      window.location.href = "../html/movie.html"; //Redirect to a new page
    });
  });
};

// Adding EventListners to Search Box and Search Suggestions Box List
window.addEventListener("click", function (e) {
  if (e.target.className != "form-control") {
    searchList.classList.add("hide-search-list"); // It will hide suggestions box List if user click anywhere other than suggestion box
  }
});

searchBox.addEventListener("keyup", findMovies);
searchBox.addEventListener("click", findMovies);