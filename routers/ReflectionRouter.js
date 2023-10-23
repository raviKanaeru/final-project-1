const router = require("express").Router();
const ReflectionController = require("../controllers/ReflectionController");

router.get("/", ReflectionController.getAllReflection);

module.exports = router;
