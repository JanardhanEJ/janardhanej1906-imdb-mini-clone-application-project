let movieID = localStorage.getItem("movieID"); // Get movie ID from localstorage
const addToFavBtn = document.querySelector("#addToFav"); // Add to favourite Button

let favMovies = JSON.parse(localStorage.getItem("favMovies")); // Get details of list of movies stored in localstorage
const resultGrid = document.querySelector("#result-grid"); // Movie container which holds details of particular movie

// this command will run only if there is a valid movieID
if (movieID) {
  getData(movieID);
}

// Load only clicked movie detail from IMDB Home Page 
async function getData(movieID) {
  const result = await fetch(
    `http://www.omdbapi.com/?i=${movieID}&apikey=5af17480`
  ); //Base URL
  const movieDetails = await result.json(); //Converting Movie Details from server to JSON format
  displayMovieDetails(movieDetails); //Display the Selected movie Details from IMDB Home page Search box List
}

//Showing movie in the moviePage
const displayMovieDetails = (details) => {
  //Add movie details to movie Page which is selected by the User
  resultGrid.innerHTML = `
    <div class="movie-poster">
      <img src="${
        details.Poster != "N/A" ? details.Poster : "../images/notFound.png"
      }" alt="movie-poster">
    </div>

    <div class="movie-info">
      <h3 class="movie-title">${details.Title}</h3>
      <ul class="movie-misc-info">
        <li class="year">Year: ${details.Year}</li>
        <li class="rated">Ratings: ${details.Rated}</li>
        <li class="released">Released: ${details.Released}</li>
      </ul>

      <p class="genre"><b>Genre: </b>${details.Genre}</p>
      <p class="runtime"><b>Run time:  </b>${details.Runtime}</p>
      <p class="imdbRating"><b>IMDB Rating:  </b>${details.imdbRating}/10</p>
      <p class="director"><b>Director:  </b>${details.Director}</p>
      <p class="writer"><b>Writer:  </b> ${details.Writer}</p>
      <p class="actors"><b>Actors:  </b> ${details.Actors}</p>
      <p class="plot"><b>Plot:  </b> ${details.Plot}</p>
      <p class="language"><b>Language:  </b> ${details.Language}</p>
      <p class="awards"><b>Awards:  <i class="fa-solid fa-award"></i></b> ${
        details.Awards
      }</p>
    </div>
  `;
};

//Set addToFav button text to "already added to Favourite Movie list" if it is already there in fav-list
if (movieID) {
  if (favMovies.includes(movieID)) {
    addToFavBtn.textContent = "Already Added To Favourite Movie List !!";
  }
}

//Favourite Button
const addToFav = () => {
  addToFavBtn.textContent = "Added To Favourites";

  //Check if movie name is already added to the favourite list
  if (favMovies.includes(movieID)) {
    addToFavBtn.textContent = "Already Added To Favourites";
  } else {
    favMovies.push(movieID); //Add movie to favourite list

    //add new favourite Movies data to local storage
    localStorage.setItem("favMovies", JSON.stringify(favMovies)); //set data to localstorage
  }
};

//Event listeners
addToFavBtn.addEventListener("click", addToFav);