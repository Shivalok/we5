const express = require("express");
const router = express.Router();
const buildError = require("../../utils/error-builder");
const User = require("../../models/user");
const upload = require("../../utils/image-uploader")
const auth = require('../../middleware/auth')
const bcrypt = require("bcryptjs");

router.put("/", upload.single("userImage"), async (req, res) => {

  try {
    const currentUser = await User.findOne({ _id: req.headers.userId });
    const hashPass = await bcrypt.hash(req.body.password, 12);

    if (req.file) {
      currentUser.profilePictureUrl = req.file.filename
    }

    currentUser.name = req.body.name
    currentUser.password = hashPass

    currentUser.dateOfBirth = req.body.dateOfBirth

    await currentUser.save();
    res.send(currentUser);
  } catch (error) {
    return buildError(res, 500, error.message);
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find()
    res.send(users)
  } catch (err) {
    res.status(500).send('Server error')
  }
})

router.put('/onboarding', async (req, res) => {

  try {
    const currentUser = await User.findOne({ _id: req.headers.userId });

    if (currentUser.name && currentUser.email && currentUser.password && currentUser.gender) {
      currentUser.isOnBoarded = "true"
    }



    await currentUser.save();
    res.send(currentUser);
  } catch (error) {
    return buildError(res, 500, error.message);
  }
})

module.exports = router;
