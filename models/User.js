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

                // Might need this syntax?
                //  thoughtsId: {
                //     type: Schema.Types.ObjectId,
                //     default: () => new Types.ObjectId(), ref: 'Thoughts'
                //   },

            }
        ],
// it's putting the user id into the friends object instead of the user id
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                // not sure on above syntax because its a self reference, does above store the user id of the friend, or do I need a friend id

                // Might need this syntax?
                //  friendsId: {
                //     type: Schema.Types.ObjectId,
                //     default: () => new Types.ObjectId(), ref: 'User'
                //   },

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
