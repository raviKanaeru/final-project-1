const router = require("express").Router();
const UserRouter = require("./UserRouter");
const ReflectionRouter = require("./ReflectionRouter");
const { authentication } = require("../middlewares/auth");

router.use("/api/v1/users", UserRouter);
router.use("/api/v1/reflections", authentication, ReflectionRouter);
module.exports = router;
