import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api.js'
//Functionality to handle a bad request type error
class BadRequestError extends CustomAPIError
{
    constructor(message)
    {
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export default BadRequestError