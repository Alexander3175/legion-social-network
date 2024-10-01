import express from 'express';
import UserController from '../controllers/user-controller.js';

let router = express.Router();

router.post('/reg', UserController.registration)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activated/:link', UserController.activate)
router.get('/refresh', UserController.refresh)

router.get('/users', UserController.getuser)

export default router;