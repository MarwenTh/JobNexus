const userController = require("../controllers/userController");
const express = require("express");
const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);
router.put("/logout/:id", userController.logoutUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
