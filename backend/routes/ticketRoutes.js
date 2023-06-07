const express = require("express");
const router = express.Router();
const {
  getTickets,
  createTicket,
  updateTicket,
  deleteTicket,
  getTicketDetails,
} = require("../controllers/ticketController");

const { protect } = require("../middleware/authMiddleware");

// re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/ticketId/notes', noteRouter)

router.route("/").get(protect, getTickets).post(protect, createTicket);
router
  .route("/:id")
  .get(protect, getTicketDetails)
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

module.exports = router;
