import { Router } from "express";
// import Auth from './authentication/auth.js';

import * as rh from './requestHandler.js'

const router=Router()

router.route('/adduser').post(rh.addUser)
router.route('/login').post(rh.login)

export default router