const knex = require("../db/connection");

function list(showing) {
  if (showing) {
    return knex("movies as m")
      .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
      .select("m.*")
      .where({ "mt.is_showing": true })
      .groupBy("m.movie_id");
  } else {
    return knex("movies").select("*");
  }
}

function read(movieId) {
  return knex("movies").select("*").where({ movie_id: movieId }).first();
}

function readTheaters(movieId) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .join("theaters as t", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.is_showing", "m.movie_id")
    .where({ "m.movie_id": movieId })
    .andWhere({ "mt.is_showing": true });
}

function listReviews(movieId) {
  return knex("movies as m")
    .join("reviews as r", "r.movie_id", "m.movie_id")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("*")
    .where({ "r.movie_id": movieId });
}

module.exports = {
  list,
  read,
  readTheaters,
  listReviews,
};
