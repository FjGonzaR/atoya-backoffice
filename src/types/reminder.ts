import { Reminder } from "../entity/Reminder";

export class ReminderFormat{
    dued: Reminder[]
    soon: Reminder[]
    all: Reminder[]
    constructor(pDued, pSoon, pAll)
    {
        this.dued = pDued;
        this.soon = pSoon;
        this.all = pAll;
    }
}