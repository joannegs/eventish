import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Request, Response } from 'express';
import { getById as getEventById } from '../repositories/event-repository';
import { getByUserAndEvent as getInviteByUserAndEvent } from '../repositories/invite-repository';
import { getByGuestAndEvent as getGuestEventByGuestAndEvent} from '../repositories/eventGuest-repository';
import { jwtPayloadResponse } from '../interfaces/jwtPayloadResponse-interface';
import { jwtPayloadResetPasswordResponse } from '../interfaces/jwtPayloadResetPasswordResponse-interface';
import { CryptResponse } from '../interfaces/cryptResponse-interface';
import { randomBytes } from 'crypto';

export const cryptPassword = (password: string) => {
    return new Promise<CryptResponse>((resolve, reject) => {
        const salt = crypto.randomBytes(8).toString('hex');
        crypto.scrypt(password, salt, 64, (error, hash) => {
            if (error) reject(error);
            const response = { cryptResponse: (`${salt}:${hash.toString('hex')}`) };
            resolve(response);
        })
    })
}

export const descryptPassword = (password: string, cryptPassword: string) => {
    return new Promise<Boolean>((resolve, reject) => {
        const [salt, hash] = cryptPassword.split(":");
        crypto.scrypt(password, salt, 64, (error, hashVerification) => {
            if (error) reject(error);
            resolve(hash === hashVerification.toString('hex'));
        })
    })
}

export const createLoginToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export const createResetPasswordResetToken = (payload: any) => {
    return jwt.sign(payload, process.env.JWT_RESET_PASSWORD_URL_SECRET as string, { expiresIn: "1h" });
}

export const createResetPasswordToken = () => {
    return randomBytes(20).toString('hex');
}

export const decodeLoginToken = async (token: any) => {
    return <jwtPayloadResponse>jwt.verify(token, process.env.JWT_SECRET);
}

export const decodeResetPasswordResetToken = async (token: any) => {
    return <jwtPayloadResetPasswordResponse>jwt.verify(token, process.env.JWT_RESET_PASSWORD_URL_SECRET);
}

export const verifyToken = (token: any) => {
    try {
        return (token ? jwt.verify(token, process.env.JWT_SECRET as string) : null);
    } catch (error) {
        return null;
    }
}

export const authentication = (req: Request, res: Response, next: any) => {
    var token = req.headers.authorization;

    if (!token) {
        res.status(401).send({
            message: 'Authentication requested'
        });
    } else {
        try {
            verifyToken(token);
            next();
        } catch (error) {
            res.status(401).send({ message: 'Invalid token' })
        }
    }
}

export const authorizationEvents = async (req: Request, res: Response, next: any) => {
    let event = await getEventById(req.query.id);
    if (event == null) event = await getEventById(req.params.id)
    const token = req.headers.authorization;
    const inviteUser = await getInviteByUserAndEvent((await decodeLoginToken(token)).id, event._id); // checa se existe um convite para o usuário que está tentando acessar o evento 
    const guestEventUser = await getGuestEventByGuestAndEvent((await decodeLoginToken(token)).id, event._id); // checa se o usuário é um convidado no evento

    ((event.user != (await decodeLoginToken(token)).id) && inviteUser.length == 0 && guestEventUser.length == 0)
     ? res.status(403).send({ message: 'Not authorized' }) : next();
}
