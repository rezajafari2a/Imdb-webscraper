import { readCSVData } from "./helper/csvReader.js";
import * as fs from "fs";

//Search to find movie id
const searchMovieData = (title, movieId) => {
  fetch(`https://www.imdb.com/find/?q=${title}&ref_=nv_sr_sm`)
    .then((response) => response.text())
    .then((html) => {
      try {
        const movieTextData = html
          .split('<script id="__NEXT_DATA__" type="application/json">')[1]
          .split("</script>")[0];
        const movieData = JSON.parse(movieTextData);
        if (movieData.props.pageProps.titleResults.results?.[0]) {
          fetchMovieData(
            movieId,
            movieData.props.pageProps.titleResults.results?.[0].id
          );
        } else {
          throw new Error("no result");
        }
      } catch (error) {
        console.log("🚀 ~ searchMovieData ~ error:", error);
        fs.writeFile(
          `../dataset-ml-32m/error/${movieId}.json`,
          title.split("(")[0],
          { flag: "wx" },
          function (err) {
            console.log("It's saved!:", movieId);
          }
        );
      }
    });
};

//Fetching movie data
const fetchMovieData = (moveiLensId, movieId) => {
  fetch(`https://www.imdb.com/title/${movieId}`)
    .then((response) => response.text())
    .then((html) => {
      const movieTextData = html
        .split('<script id="__NEXT_DATA__" type="application/json">')[1]
        .split("</script>")[0];
      const movieData =
        JSON.parse(movieTextData).props.pageProps.mainColumnData;
      saveMovieData(moveiLensId, movieData);
    });
};

//Saving movie Data
const saveMovieData = (moveiLensId, movieData) => {
  fs.writeFile(
    `../dataset-ml-32m/${moveiLensId}.json`,
    JSON.stringify(movieData),
    { flag: "wx" },
    function (err) {
      console.log("It's saved!:", moveiLensId);
    }
  );
};

function cleanTitle(title) {
  const onlyTitle = title.replace(/ *\([^)]*\) */g, "");
  const regExp = /\((\d{4})\)/g;
  const onlyYear = regExp.exec(title);
  if (onlyYear) {
    return `${onlyTitle} (${onlyYear})`;
  } else return onlyTitle;
}

async function sleep(msec) {
  return new Promise((resolve) => setTimeout(resolve, msec));
}

//Reading data from csv file
const moviesList = await readCSVData("../ml-32m/movies.csv");

//Search and extract data Foreach movie on Imdb website. 
for (let index = 280; index < moviesList.length; index++) {
  const movie = moviesList[index];
  searchMovieData(cleanTitle(movie.title), movie.movieId);
  await sleep(4000);
}

