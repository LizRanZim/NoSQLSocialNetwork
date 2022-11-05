const { Schema, model } = require('mongoose');
const validatorPackage = require('validator')

// Schema to create User model

// mongoose.SchemaTypes.String.set('trim', true);

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            trim: true,
            validate: {
                validator: validatorPackage.isEmail,
                message: 'Please provide a valid email address'
            },
        },

        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',

            }
        ],

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                // not sure on above syntax because its a self reference

            }
        ],
    },
    {
        //  Include virtuals
        toJSON: {
            virtuals: true,
        },
        id: false,
    }

);

// Adds virtual called friendCount that retrieves the length of the user's friends array field on query.

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


// Initialize User model
const User = model('user', userSchema);

module.exports = User;
