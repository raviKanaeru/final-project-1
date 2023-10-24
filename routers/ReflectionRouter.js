const router = require("express").Router();
const ReflectionController = require("../controllers/ReflectionController");

router.get("/", ReflectionController.getAllReflection);
router.post("/", ReflectionController.createReflection);

module.exports = router;
