const express = require("express");

const adminController = require("../controllers/admin");
const { checkAdmin, checkConsultant } = require("../middleware");

const router = express.Router();
//approuver l'enregistrement

router.get("/getUser", checkAdmin, adminController.getUser);

//approuver les consultants
router.get("/getConsultant", checkAdmin, adminController.getConsultant);

//approuver les posts
router.get("/getPosts", checkConsultant, adminController.getPosts);
router.post(
  "/approveUser/:userId",
  checkConsultant,
  adminController.approveUser
);
router.post(
  "/approveConsultant/:userId",
  checkAdmin,
  adminController.approveConsultant
);
router.post(
  "/approvePost/:postId",
  checkConsultant,
  adminController.approvePost
);
router.post(
  "/approvePostCandidate/:candidateId/:postId",
  adminController.approvePostCandidate
);
module.exports = router;
