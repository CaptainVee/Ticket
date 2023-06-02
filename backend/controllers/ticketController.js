const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get user ticket
// @route   /api/ticket
// @access  Private
const getTickets = asyncHandler(async (req, res) => {
    const ticket = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    }
    res.status(200).json({message: 'getTicket'})
  })

// @desc    Createticket
// @route   /api/ticket
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const ticket = {
      id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    }
    res.status(201).json({message: 'createTicket'})
  })

module.exports = {
    getTickets,
    createTicket,
}