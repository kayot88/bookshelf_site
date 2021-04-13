// if we have the node/express server only then
// this is for example

module.exports = (app) => {
  app.get(/^\/$/, (req, res) => res.redirect("/discover"));
};
