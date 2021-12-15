import { IEvent } from "./event.interface";

export interface EventGuest {
    _id: string;
    guest: string;
    event: IEvent;
}