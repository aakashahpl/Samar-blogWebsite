import express from 'express';
import user from '../model/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

const route1 = express.Router();

route1.post('/register', async (req, res) => {
  try {
    console.log(req.body);
    await user.register({ username: req.body.email }, req.body.password);
    passport.authenticate('local')(req, res, () => {
      const accessToken = jwt.sign(
        { user: req.body.email},
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken: accessToken });
    });
  } catch (error) {
    console.log(`unable to register user : ${error.message}`);
    res.status(500);
    res.json({ error: error.message });
  }
});

route1.post('/login', async (req, res) => {
  try {
    const userVariable = new user({
      username: req.body.email,
      password: req.body.password,
    });
    console.log(userVariable);
    passport.authenticate('local')(req, res, () => {
      console.log("here2");
        const accessToken = jwt.sign(
          { user: req.body.email},
          process.env.ACCESS_TOKEN_SECRET
        );
        console.log(accessToken);
        res.json({ accessToken: accessToken });
      });
      console.log("here");
  } catch (error: any) {
    console.log(`unable to login : ${error.message}`);
    res.status(500);
    res.json({error:error.message});
  }
});

route1.get('/logout', (req, res) => {
    
});

export default route1;
