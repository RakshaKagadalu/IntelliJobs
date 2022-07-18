//Functionality to handle a custom api type error
class CustomAPIError extends Error 
{
    constructor(message)
    {
        super(message)
        
    }
}

export default CustomAPIError