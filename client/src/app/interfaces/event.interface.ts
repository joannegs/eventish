export interface IEvent {
    _id: string;
    title: string;
    startsAt: Date;
    endsAt: Date,
    description: string;
    user: string;
    eventGuestID?: string;
}