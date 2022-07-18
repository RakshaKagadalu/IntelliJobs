import { StatusCodes } from "http-status-codes";
//Functionality to handle all the errors in the middleware
const handleErrorMiddleware = (err, req, res, next) => {

  //Setting up a default error message
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Opps something is not right, please try again",
  };
  //Setting error handling for validation error
  if (err.name === "ValidationError") {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(",");
  }
  //Setting up error handling for Bad request
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(
      err.keyValue
    )} the input field has to be unique`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default handleErrorMiddleware;
