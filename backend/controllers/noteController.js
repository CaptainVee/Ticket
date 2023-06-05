const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");


const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// @desc    Get note for a ticket
// @route   /api/ticket/:tickedId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // get userusing the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = Ticket.findById(req.params.ticketId);

  if (ticket.user.toSring() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorised")
  }

  const note = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(note);
});

// @desc    Add note for a ticket
// @route   /api/ticket/:tickedId/notes
// @access  Private
const addNotes = asyncHandler(async (req, res) => {
    // get userusing the id in the JWT
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
  
    const ticket = Ticket.findById(req.params.ticketId);
  
    if (ticket.user.toSring() !== req.user.id) {
      res.status(401)
      throw new Error("User not authorised")
    }
  
    const note = await Note.create({
        text: req.body.text,
        isStaff: false,
        user: req.user.id,
        ticket: req.params.ticketId})
  
    res.status(200).json(note);
  });



module.exports = {
  getNotes,
  addNotes
};
