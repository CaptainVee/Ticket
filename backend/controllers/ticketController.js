const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// @desc    Get user ticket
// @route   /api/ticket
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
  // get userusing the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

// @desc    Get user ticket
// @route   /api/ticket/:id
// @access  Private
const getTicketDetails = asyncHandler(async (req, res) => {
  // get userusing the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error(`Not Authorised ooooo ${ticket.user.toString()}, ${req.user.id}`);
  }
  res.status(200).json(ticket);
});

// @desc    UPDATE user ticket
// @route   /api/ticket/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
  // get userusing the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

// @desc    DELETE user ticket
// @route   /api/ticket/:id
// @access  Private
const deleteTicket = asyncHandler(async (req, res) => {
  // get userusing the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }

  if (ticket.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorised");
  }

  await ticket.remove({ success: true });
  res.status(200).json(ticket);
});

// @desc    Createticket
// @route   /api/ticket
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(400);
    throw new Error("Add product and description");
  }

  // get userusing the id in the JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  res.status(201).json({ message: "createTicket" });
});

module.exports = {
  getTickets,
  getTicketDetails,
  updateTicket,
  deleteTicket,
  createTicket,
};
