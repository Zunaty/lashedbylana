const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        // Getting currently logged in user
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user.id })
                    .select('-__v -password')
                    .populate('appointments');
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },

        // Getting user by username
        user: async (parent, { username }) => {
            const params = username ? { username } : {};
            const user = await User.find(params)
                .select('-__v -password')
                .populate('appointments');
            return user;
        }
    },

    Mutation: {
        // Adding a user
        addUser: async (parent, args, context) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        // Login a user
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Wrong user');
            }
            
            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                throw new AuthenticationError('Incorrect Password')
            }

            const token = signToken(user);

            return { token, user };
        },


    }
}