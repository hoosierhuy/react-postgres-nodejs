import express from 'express';
import authenticate from '../middlewares/authenticate';

let router = express.Router();

router.post('/', authenticate, (req, res) => {
  // authenticate first before proceeding to route
  res.status(201).json({ user: req.currentUser });
});

export default router;