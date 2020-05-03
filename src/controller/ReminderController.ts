import { Reminder } from "../entity/Reminder";
import { Connection } from "typeorm";

export const createReminder = async(
    reminder : Reminder,
    dbConn : Connection
) => {
   await dbConn.manager.save(reminder);
}

export const deleteReminder = async(
    reminderId : string,
    dbConn : Connection
) => {
    await dbConn.getRepository(Reminder).delete(reminderId);
}

export const findReminder = async(
    reminderId : string,
    dbConn : Connection
) =>  await dbConn.manager.findOne(Reminder, reminderId);
