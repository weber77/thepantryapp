require ('dotenv').config();
const User = require("../models/userModel");
const argon2 = require("argon2"); //https://github.com/ranisalt/node-argon2/wiki/Options
const jwt = require("jsonwebtoken");
const validator = require("validator");
const jwt_secret = process.env.JWT_SECRET;

// the client is sending this body object
//  {
//     email: form.email,
//     password: form.password,
//     password2: form.password2
//  }
const register = async (req, res) => {
  const { email, password, password2 } = req.body;
  if (!email || !password || !password2)
    return res.json({ ok: false, message: "All fields required" });
  if (password !== password2)
    return res.json({ ok: false, message: "Passwords must match" });
  if (!validator.isEmail(email))
    return res.json({ ok: false, message: "Invalid credentials" });
  try {
    const user = await User.findOne({ email });
    if (user) return res.json({ ok: false, message: "Invalid credentials" });
    const hash = await argon2.hash(password);
    console.log("hash ==>", hash);
    const newUser = {
      email,
      password: hash,
      username: email
    };
    const newuser = await User.create(newUser);
    const token = jwt.sign(newuser.toJSON(), jwt_secret, { expiresIn: "7d" });
    res.json({ ok: true, message: "Successfully registered", token });
  } catch (err) {
    res.json({ ok: false, err });
  }
};
// the client is sending this body object
//  {
//     email: form.email,
//     password: form.password
//  }
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ ok: false, message: "All field are required" });
  if (!validator.isEmail(email))
    return res.json({ ok: false, message: "invalid data provided" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ ok: false, message: "invalid data provided" });
    const match = await argon2.verify(user.password, password);
    if (match) {
      const token = jwt.sign(user.toJSON(), jwt_secret, { expiresIn: "1h" }); //{expiresIn:'365d'}
      res.json({ ok: true, message: "welcome back!", token, email });
    } else return res.json({ ok: false, message: "invalid data provided" });
  } catch (err) {
    res.json({ ok: false, err });
  }
};

const verify_token = (req, res) => {
  console.log(req.headers.authorization);
  const token = req.headers.authorization;
  jwt.verify(token, jwt_secret, (err, succ) => {
    err
      ? res.json({ ok: false, message: "something went wrong" })
      : res.json({ ok: true, succ });
  });
};

const insert = (req, res) => {
  const {newItem} = req.body
  try {
    const user = User.pantry;
    

  } catch (err) {
    res.json({ok: false, err});
  }
}

module.exports = { register, login, verify_token, insert };
