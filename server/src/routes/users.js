import express from 'express';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import commonValidations from '../shared/validation/signup';
import User from '../models/userModel';

let router = express.Router();

function validateInput(data, otherValidations) {
  // Ensure user name & password doesn't already exists in DB, inform users if they exists
  let { errors } = otherValidations(data);
  const username = data.username.toLowerCase();
  const email = data.email.toLowerCase();

  // User name and email addy should be lower case when persisting to db
  return User.query(function(qcb) {
    qcb.whereRaw('LOWER(username) = ?', username)
      .orWhereRaw('LOWER(email) = ?', email);
  }).fetch().then(user => {
    if (user) {
      // .get method below is from BookShelf
      if (user.get('username').toLowerCase() === username) {
        errors.username = 'User name already in use';
      }
      if (user.get('email').toLowerCase() === email) {
        errors.email = 'Email already in use';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  });
}

router.get('/:identifier', (req, res) => {
  const identifier = req.params.identifier.toLowerCase();

  User.query(function(qcb) {
    qcb.select(['username', 'email'])
      .whereRaw('LOWER(username) = ?', identifier)
      .orWhereRaw('LOWER(email) = ?', identifier);
  }).fetch().then(user => {
    res.json({ user });
  });
});

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const { username, password, timezone, email } = req.body;
      const password_digest = bcrypt.hashSync(password, 10);

      User.forge({
        username, timezone, email, password_digest,
      }, { hasTimestamps: true }).save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));

    } else {
      res.status(400).json(errors);
    }
  });
});

export default router;