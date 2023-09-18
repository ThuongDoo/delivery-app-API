const notFound = (req, res) => {
  res.status(404).json({ msg: "Routes does not exist" });
};

module.exports = notFound;
