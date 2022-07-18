import { UnAuthenticated } from '../errors/index.js'

const checkPermissions = (requestUser, resourceId) => {
    if(requestUser.userId === resourceId.toString()) return

    throw new UnAuthenticated('Not Authorized To Access This Route')
}

export default checkPermissions