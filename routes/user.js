const express = require("express");

const userController = require("../controllers/user");
const {
  checkLoggedIn,
  checkAdmin,
  checkRecruiter,
  checkConsultant,
} = require("../middleware");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.get("/register", userController.getRegister);
router.post("/register", userController.postRegister);
router.post("/registerConsultant", userController.postRegisterConsultant);
router.get("/logout", userController.getLogout);
router.get("/updateUser", checkLoggedIn, userController.getUser);
router.post("/updateUser/:userId", checkLoggedIn, userController.updateUser);
router.post(
  "/upload",
  upload.single("pdf"),
  checkLoggedIn,
  userController.uploadFiles
);
router.get("/uploads/:filename", checkLoggedIn, userController.downloadFile);
module.exports = router;
