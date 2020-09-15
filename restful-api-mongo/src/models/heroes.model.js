// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const Schema = mongoose.Schema;

// Create a new Schema for our collection
const heroesSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  specialty: {
    type: String,
    required: true,
  },
  ranking: {
    type: [
      {
        type: String,
        enum: ['S', 'A', 'B', 'C', 'D'],
      },
    ],
    default: ['D'],
  },
  rent: {
    type: Number,
    required: true,
  },
  hired: Boolean,
});

// Expose the collections functions for use in our controller
module.exports = mongoose.model('Heroes', heroesSchema);
