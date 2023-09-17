import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const authenticate = ({ secret }) => {
    return async(req, res, next) => {
        try {
            console.log('AUTHENTICATE.JS');
            let token = '';

            if (req.headers.authorization) {
                token = req.headers.authorization.split(' ')[1];
            }

            if (token) {
                const { _id } = jwt.verify(token, secret);

                const user = await User.findById(_id).lean()

                if (user) {
                    req.user = user;
                }
            }
        }
        catch (error) {
            console.error(error);
        }

        next();
    };
};

export default authenticate;