const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

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
            // use a getter method to format the timestamp on query?? See format_date function on homework 14 for ideas here
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

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
