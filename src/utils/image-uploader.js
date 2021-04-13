const multer = require("multer");
const { v4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, v4() + file.originalname);
  },
});
const upload = multer({ storage });

module.exports = upload