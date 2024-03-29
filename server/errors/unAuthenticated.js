import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

//Functionality to handle a unauthenticated user error
class UnAuthenticated extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED; 
  }
}

export default UnAuthenticated;
