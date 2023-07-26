const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).send("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    

    !isPasswordCorrect &&
      res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      {expiresIn:"3d"}
    );
    
    // const { password, ...others } = user._doc;

    res.status(200).json({accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;