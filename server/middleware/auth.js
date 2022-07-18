import jwt from 'jsonwebtoken'
import { UnAuthenticated } from "../errors/index.js"

//To authenticate a user using JWT token functionality
UnAuthenticated
const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnAuthenticated('Authentication Invalid')
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_ENCKEY)
        req.user = {userId: payload.userUniqId}
        next()
    }
    catch (error) {
        throw new UnAuthenticated('Authentication invalid')
    }
}

export default auth
