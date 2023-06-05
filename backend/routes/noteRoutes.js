const express = require("express");
const router = express.Router({ mergeParams: true });
const { getNotes, addNotes } = require("../controllers/noteController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getNotes).post(protect, addNotes);
// router
//   .route("/:id")
//   .get(protect, getTicket)
//   .put(protect, updateTicket)
//   .delete(protect, deleteTicket);

module.exports = router;
