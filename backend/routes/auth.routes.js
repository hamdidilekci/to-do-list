import express from 'express';

import AuthService from '../services/auth.service.js';

import handleError from '../middleware/handle-error.js'

const router = express.Router();

router.post('/sign-in', async(req, res) => {
    try {
        const signInData = await AuthService.signIn(req.body);

        res.send(signInData);
    }
    catch (error) {
        handleError(error, req, res);
    }
});

router.post('/sign-up', async(req, res) => {
    try {
        const user = await AuthService.signUp(req.body);

        // sign user in
        const signInData = await AuthService.signInDirect(user);
        res.send(signInData);
    }
    catch (error) {
        handleError(error, req, res);
    }
});

export default router;