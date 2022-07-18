//Functionality to handle invalid route error
const doesNotExistMiddleware = (req, res) =>
  res.status(404).send("The following route does not exist, Please try again!");

export default doesNotExistMiddleware;
