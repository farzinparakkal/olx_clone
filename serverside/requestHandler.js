import userSchema from "./models/user.model.js"

import bcrypt from "bcrypt"
import pkg from "jsonwebtoken"
const { sign } = pkg


export async function addUser(req, res) {
    const { username, email, phone, pwd, cpwd} = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      if (!(username && email && pwd && cpwd))
        return res.status(500).send({ msg: "fields are empty" });
      if (pwd !== cpwd) return res.status(500).send({ msg: "pass not match" });
      bcrypt
        .hash(pwd, 10)
        .then((hpwd) => {
          userSchema.create({ username, email, phone, pass: hpwd});
          res.status(201).send({ msg: "Successfull" });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ msg: "Error creating user." });
        });
    } else {
      res.status(500).send({ msg: "email already used" });
    }
  }

  export async function login(req, res) {
    const { email, pass } = req.body
    if (!(email && pass))
      return res.status(500).send({ msg: "fields are empty" })
    const user = await userSchema.findOne({ email })
    if (!user) return res.status(500).send({ msg: "email donot exist" })
    const success = await bcrypt.compare(pass, user.pass)
    if (success !== true)
      return res.status(500).send({ msg: "email or password not exist" })
    const token = await sign({ UserID: user._id }, process.env.JWT_KEY, {expiresIn: "24h",})
    res.status(201).send({ token })
  }