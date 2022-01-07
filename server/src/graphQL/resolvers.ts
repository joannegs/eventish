import * as userRepository from '../repositories/user-repository';
import { removeByUser as deleteEventsByUser } from '../repositories/event-repository';
import { removeByUser as deleteEventGuestsByUser } from '../repositories/eventGuest-repository';
import { removeByUser as deleteInvitesByUser } from '../repositories/event-repository';
import { createLoginToken, createResetPasswordToken, createResetPasswordResetToken,
     cryptPassword, descryptPassword, decodeResetPasswordResetToken } from '../services/authService';
import { sendEmail } from '../utils/sendEmail';

export const resolvers = {
    Query: {
        user: async (_: any, args: any, { auth }: any) => {
            if (!auth) throw new Error("Authentication required");
            const user = await userRepository.getById(args.id);
            if (user == null) throw new Error('User does not exists');

            return user;
        },

        userByEmail: async (_: any, args: any, { auth }: any) => {
            if (!auth) throw new Error("Authentication required");
            const user = await userRepository.getByEmail(args.email);
            if (user == null) throw new Error('User does not exists');

            return user;
        }
    },

    Mutation: {
        createUser: async (_: any, { data }: any) => {
            try {
                const existentUser = await userRepository.getByEmail(data.email);

                if (existentUser != null) {
                    throw new Error("User already signed up");
                } else {
                    const user = await userRepository.create({
                        name: data.name,
                        email: data.email,
                        password: (await cryptPassword(data.password)).cryptResponse
                    });

                    const token = createLoginToken({ id: user._id, email: data.email });

                    return { token: token, id: user._id };
                }
            } catch (error: any) {
                throw new Error(error.message);
            }
        },

        forgotPassword: async (_: any, { email }: any) => {
            try {
                const user = await userRepository.getByEmail(email);
                if (user == null) throw new Error('User does not exists');

                const token = createResetPasswordToken();
                const now = new Date();
                now.setHours(now.getHours() + 1);

                await userRepository.updateResetPasswordToken(user.id, token, now);
                const resetPasswordUrlParam = createResetPasswordResetToken({ email: user.email, tokenReset: token });

                 const emailData = {
                     to: email,
                     from: "eventish@email.com",
                     subject: "eventish - reset your password",
                     templateEmailName: "forgotPassword",
                     templateEmailReplacements: {
                         userName: user.name,
                         resetPasswordUrlParam: resetPasswordUrlParam
                     }
                 }

                 sendEmail(emailData);
                 return true;
                 
            } catch (error) {
                throw new Error(error.message);
            }
        },

        resetPassword: async (_: any, { token, password }) => {
            try {
                const { email, tokenReset } = await decodeResetPasswordResetToken(token);

                const user = await userRepository.getResetTokenByEmail(email);
                if (user == null) throw new Error('User does not exists');

                if (tokenReset != user.passwordResetToken) throw new Error('Invalid token');

                const now = new Date();
                if (now > user.passwordResetExpiration) throw new Error('Expired token, generate a new one');

                await userRepository.updatePassword(user.id, password);

                return true;
                
            } catch (error) {
                throw new Error(error.message);
            }
        },

        updateUser: async (_: any, args: any, { auth }: any) => {
            if (!auth) throw new Error("Authentication required");
            args.data.password = (await cryptPassword(args.data.password)).cryptResponse;

            await userRepository.put(auth.id, args.data);
            return await userRepository.getById(auth.id);
        },

        deleteUser: async (_: any, args: any, { auth }: any) => {
            if (!auth) throw new Error("Authentication required");

            // cascade remove
            deleteEventsByUser(auth.id);
            deleteInvitesByUser(auth.id);
            deleteEventGuestsByUser(auth.id);

            return !!userRepository.remove(auth.id);
        },

        login: async (_: any, { email, password }: any) => {
            try {
                const user = await userRepository.getByEmail(email);

                if (user == null) throw new Error('User does not exists');

                const validPassword = await descryptPassword(password, user.password);

                if (!validPassword) throw new Error('Incorrect password');

                const token = createLoginToken({ id: user._id, email: email });
                return { token: token, id: user._id }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
}
