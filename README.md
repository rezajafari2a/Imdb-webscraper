# A Javascript Imdb webscraper
This is a Javascript webscraper which read movies name from CSV file and search title on imdb. After that it's extract imdbId of each movie and this time it search with imdbid. 
The CSV file is [dataset MovieLens (ml-32m)](https://files.grouplens.org/datasets/movielens/ml-32m-README.html), dataset. It search each movie on Imdb website. this is code to show how you can write webscraper with javascript and extract data for MovieLens 32M dataset to get more information about movie.

## Project Architecture
This project includes 3 main folder.
* code: contains a helper method to read csv file and index.js which contains the main functionality.
* dataset-ml-32m: This folder containes error folder that containes expception details and JSON files. JSON files expose the movie details that has been founded on Imdb website. 
* ml-32m: It's a dataset folder that has been used to read movie title.
