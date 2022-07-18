import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

//Functionality to handle a does not exist type error
class doesNotExistError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

export default doesNotExistError;
