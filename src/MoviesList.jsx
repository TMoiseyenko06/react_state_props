//Conditional Rendering of Movie Details /  Implementing Movie Removal (took forever to debug and figure this out)
import { useState } from "react";

function MoviesList() {
  const [movies, setMovies] = useState({
    "Harry Potter": [
      "A young wizard discovers his magical heritage.",
      "fantasy",
    ],
    "John Wick": [
      "An ex-hitman comes out of retirement to seek vengeance.",
      "action",
    ],
    "Lord Of The Rings": [
      "A hobbit embarks on a quest to destroy a powerful ring.",
      "fantasy",
    ],
  });
  const [selected, setSelected] = useState(null);
  //only using the two genres that I currently have but this would work if you added more genres and more movies
  const [genres] = useState(["all", "action", "fantasy"]);
  const [selectedGenre, setGenre] = useState("all");

  const toggleDetails = (title) => {
    setSelected(title);
  };

  const removeMovie = (title) => {
    const newMovies = { ...movies };
    delete newMovies[title];
    setMovies(newMovies);
  };

  const switchGenre = () => {
    setGenre((prev) => {
      const current = genres.indexOf(prev);
      const next = (current + 1) % genres.length;
      return genres[next];
    });
  };

  //i did have to look some of this stuff up but i eventually figured it out
  return (
    <div>
      <button onClick={switchGenre}>Curently Showing: {selectedGenre}</button>
      <ul>
        {Object.entries(movies).map(([title, [desc, genre]], index) =>
          selectedGenre == "all" || selectedGenre == genre ? (
            <li key={index} onClick={() => toggleDetails(title)}>
              {title}
              {` (${genre}) `}
              {selected == title ? ` : ${desc}` : ""}
              <button
                onClick={(e) => {
                  removeMovie(title);
                  e.stopPropagation();
                }}
              >
                Remove Movie{" "}
              </button>
            </li>
          ) : (
            ""
          )
        )}
      </ul>
    </div>
  );
}

export default MoviesList;
