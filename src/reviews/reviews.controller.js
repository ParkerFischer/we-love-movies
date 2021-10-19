const reviewService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
//helper to check if a review is in the DB
async function doesReviewExist(req, res, next) {
  const { reviewId } = req.params;
  const foundReview = await reviewService.read(reviewId);

  if (foundReview) {
    res.locals.reviewId = reviewId;
    res.locals.foundreview = foundReview;
    return next();
  }
  return next({
    status: 404,
    message: `cannot be found ${reviewId}`,
  });
}

async function destroy(req, res) {
  await reviewService.delete(res.locals.reviewId);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.reviewId,
  };
  await reviewService.update(updatedReview);
  const data = await reviewService.getReviewWithCritic(res.locals.reviewId);
  res.json({ data });
}

module.exports = {
  update: [asyncErrorBoundary(doesReviewExist), asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(doesReviewExist), asyncErrorBoundary(destroy)],
};
