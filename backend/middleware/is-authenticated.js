import { UnauthorizedError } from '../common/errors.js';
import handleError from '../middleware/handle-error.js';

const isAuthenticated = async(req, res, next) => {
    if (req?.user) {
        console.log('authenticated');
        return next();
    }
    return handleError(new UnauthorizedError('Not authenticated.'), req, res);
};

export default isAuthenticated;