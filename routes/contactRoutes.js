const express = require("express");
const router = express.Router();
const validateToken = require("../middlewares/validateTokenHandler");

const {
  getContacts,
  createContact,
  getContactById,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);

router
  .route("/:id")
  .get(getContactById)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
