import { IResolverMap } from 'interfaces/IResolvers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server';
import errorMessages from 'enumerations/errorMessages';
import { authenticateGoogle, authenticateFacebook } from 'auth/passport';

const SALT = parseInt(process.env.SALT);
const SECRET = process.env.SECRET;

export default <IResolverMap>{
  login: async (parent, args, { models }) => {
    const { UsersModel } = models;
    const { username, password } = args;

    try {
      const user = await UsersModel.findOne({ username });

      if (!user) {
        throw new UserInputError(errorMessages.userNameNotFound);
      }

      const isMatch = bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        throw new UserInputError(errorMessages.wrongPassword);
      }

      return {
        accessToken: jwt.sign({ uid: user._id }, SECRET),
      };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  register: async (parent, args, { models }) => {
    const { UsersModel } = models;
    const { username, email, password } = args;

    try {
      const isUser = await UsersModel.findOne({ username });

      if (isUser) {
        throw new UserInputError(errorMessages.userNameIsFound);
      }

      const newUser = await UsersModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, SALT),
      });

      return {
        accessToken: jwt.sign({ uid: newUser._id }, SECRET),
      };
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  googleAuth: async (parent, { accessaccessToken }, { req, res, models }) => {
    const { UsersModel } = models;
    req.body = {
      ...req.body,
      access_accessToken: accessaccessToken,
    };

    try {
      const { data } = await authenticateGoogle(req, res);

      if (data) {
        const { profile, accessaccessToken } = data;

        const email = profile && profile.emails && profile.emails[0] && profile.emails[0].value;
        const displayName = profile && profile.displayName;
        const imgUrl = profile && profile._json && profile._json.picture;
        const user = await UsersModel.findOne({ $or: [{ email }, { username: displayName }] });

        // check if no user, create a new user and return accessToken
        if (!user) {
          const newUser = await UsersModel.create({
            username: displayName,
            email,
            imgUrl,
            googleAccount: {
              accessaccessToken,
            },
          });

          return {
            accessToken: jwt.sign({ uid: newUser._id }, SECRET),
          };
        }

        // check if user is available and return accessToken
        if (user) {
          await UsersModel.updateOne(
            { $or: [{ email }, { username: displayName }] },
            {
              googleAccount: {
                accessaccessToken,
              },
            }
          );

          return {
            accessToken: jwt.sign({ uid: user._id }, SECRET),
          };
        }
      } else {
        throw new AuthenticationError('Authentication Failure!');
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  facebookAuth: async (parent, { accessaccessToken }, { req, res, models }) => {
    const { UsersModel } = models;
    req.body = {
      ...req.body,
      access_accessToken: accessaccessToken,
    };

    try {
      const { data } = await authenticateFacebook(req, res);

      if (data) {
        const { profile, accessaccessToken } = data;

        const email = profile && profile.emails && profile.emails[0] && profile.emails[0].value;
        const displayName = profile && profile.displayName;
        const imgUrl = profile && profile.photos && profile.photos[0] && profile.photos[0].value;
        const user = await UsersModel.findOne({ $or: [{ email }, { username: displayName }] });

        // check if no user, create a new user and return accessToken
        if (!user) {
          const newUser = await UsersModel.create({
            username: displayName,
            email,
            imgUrl,
            facebookAccount: {
              accessaccessToken,
            },
          });

          return {
            accessaccessToken: jwt.sign({ uid: newUser._id }, SECRET),
            refreshaccessToken: jwt.sign({ uid: newUser._id }, SECRET),
          };
        }

        // check if user is available and return accessToken
        if (user) {
          await UsersModel.updateOne(
            { $or: [{ email }, { username: displayName }] },
            {
              facebookAccount: {
                accessaccessToken,
              },
            }
          );

          return {
            accessaccessToken: jwt.sign({ uid: user._id }, SECRET),
            refreshaccessToken: jwt.sign({ uid: user._id }, SECRET),
          };
        }
      } else {
        throw new AuthenticationError('Authentication Failure!');
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};
