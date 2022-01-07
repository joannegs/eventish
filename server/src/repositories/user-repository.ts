import { User } from '../models/User';
import { cryptPassword } from '../services/authService';

export const getByEmail = async(email: any) => {
    return await User.findOne({ email: email });
};

export const getResetTokenByEmail = async(email: any) => {
    return await User.findOne({ email }).select('+passwordResetToken passwordResetExpiration');
};

export const getById = async(id: any) => {
    return await User.findById(id, 'name email _id');
};

export const create = async(data: any) => {
    let user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    return await user.save();
};

export const put = async(id: any, data: any) => {
    return await User.findOneAndUpdate(id, {
        $set: {
            name: data.name,
            email: data.email,
            password: data.password
        }
    })
};

export const updateResetPasswordToken = async(userId: any, token: any, tokenExpiration: any) => {
    return await User.findOneAndUpdate(userId, {
        $set: {
            passwordResetToken: token,
            passwordResetExpiration: tokenExpiration,
        }
    });
};

export const updatePassword = async(userId: any, password: any) => {
    return await User.findOneAndUpdate(userId, {
        $set: {
            password: (await cryptPassword(password)).cryptResponse
        }
    });
};

export const remove = async(id: any) => {
    return await User.findByIdAndRemove(id);
};