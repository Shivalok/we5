const express = require("express");
const router = express.Router();
const authenticatedRoutes = require("./authenticated-routes");
const unauthenticatedRoutes = require("./unauthenticated-routes")

router.use("/api", authenticatedRoutes);
router.use("/", unauthenticatedRoutes);

module.exports = router;
