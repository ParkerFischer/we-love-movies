const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

//helper function for checking if a movie is in the DB
async function doesMovieExist(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await moviesService.read(movieId);

  if (foundMovie) {
    res.locals.movieId = movieId;
    res.locals.foundMovie = foundMovie;
    return next();
  }
  return next({
    status: 404,
    message: `Movie not found: ${movieId}`,
  });
}

// configuration for adding an embeded critic to a review
const addCriticDetails = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});


async function readTheaters(req, res, next) {
  const data = await moviesService.readTheaters(res.locals.movieId);
  res.json({ data });
}

async function listReviews(req, res) {
  const reviews = await moviesService.listReviews(res.locals.movieId);
  const data = reviews.map((review) => addCriticDetails(review));

  res.json({ data });
}

function list(req, res, next) {
  const showing = req.query.is_showing;

  moviesService
    .list(showing)
    .then((data) => res.json({ data }))
    .catch(next);
}

function read(req, res, next) {
  res.json({ data: res.locals.foundMovie }).catch(next);
}

module.exports = {
  list,
  read: [asyncErrorBoundary(doesMovieExist), read],
  readTheaters: [
    asyncErrorBoundary(doesMovieExist),
    asyncErrorBoundary(readTheaters),
  ],
  listReviews: [
    asyncErrorBoundary(doesMovieExist),
    asyncErrorBoundary(listReviews),
  ],
};
