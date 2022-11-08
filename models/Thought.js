const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
// require helper function
const { formatDate } = require('../utils/helper.js')

// Schema to create User model

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => formatDate(date)

        },
        username: {
            type: String,
            required: true,
        },

        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

// Adds virtual called reactionCount that retrieves the length of the thought's reactions array field on query

thoughtSchema
    .virtual('reactionCount').
    get(function () {
        return this.reactions.length;
    });



// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
