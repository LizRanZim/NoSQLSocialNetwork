const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');
const {formatDate} = require('../utils/helper.js')

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

            // ****REVIEW WITH TUTOR
            get: (date) => formatDate(date)
            
            // {
            //     // Custom helper 'format_date' that takes in a timestamp, formats it as M/D/YYYY
            //     return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`
            // }
            // use a getter method to format the timestamp on query?? See format_date function on homework 14 for ideas here
            // https://stackoverflow.com/questions/7443142/how-do-i-format-dates-from-mongoose-in-node-js
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
        // formatDate(date)
        return this.reactions.length;        
    });

    

// Initialize Thought model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
