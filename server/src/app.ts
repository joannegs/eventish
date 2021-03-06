import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import { graphqlHTTP } from 'express-graphql';
import { executableSchema } from './graphQL/schemas';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { verifyToken } from './services/authService';
import { router as eventRouter } from './routes/event-route';
import { router as inviteRouter } from './routes/invite-route';
import { router as eventGuestRouter } from './routes/eventGuest-route';

dotenv.config();

export const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    exposedHeaders: ['Authorization']
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGO_DB);

app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => {
    return {
        schema: executableSchema,
        graphiql: true,
        pretty: true,
        context: {
            auth: verifyToken(req.headers.authorization),
        }
    }
}));

app.use('/events', eventRouter);
app.use('/invites', inviteRouter);
app.use('/eventsGuests', eventGuestRouter);