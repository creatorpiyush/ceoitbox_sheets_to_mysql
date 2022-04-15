const route = require("express").Router();
const db = require("../models");

const bcrypt = require("bcrypt");

// create user
route.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  //   hash password
  bcrypt.hash(password, 16, (err, hash) => {
    if (err) {
      return res.status(500).send(err);
    }

    // authToken
    const authToken = bcrypt.hashSync(
      `${username}${Date.now()}`,
      bcrypt.genSaltSync(16)
    );

    const newUser = {
      username,
      password: hash,
      email,
      authToken,
    };
    //   check if user already exists
    db.query(`select * from users where email = '${email}'`, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        return res.status(200).send("User already exists");
      } else {
        db.query(`insert into users set ?`, newUser, (err, result) => {
          if (err) throw err;
          return res.status(200).send("Successfully");
        });
      }
    });
  });
});

// login
route.post("/login", (req, res) => {
  const { email, password } = req.body;
  //   console.log(email, password);
  db.query(`select * from users where email = '${email}'`, (err, result) => {
    if (err) throw err;
    // return res.status(200).send(result);
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return res.status(200).send(result[0]);
        } else {
          return res.status(200).send("Wrong password");
        }
      });
    } else {
      return res.status(200).send("User does not exist");
    }
  });
});

module.exports = route;
