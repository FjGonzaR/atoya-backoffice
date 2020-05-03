import { Connection } from "typeorm";
import { Reminder } from "../entity/Reminder";
import { createReminder, findReminder, deleteReminder } from "../controller/ReminderController";

export const createReminderHandler = async(req, dbConn: Connection) => {
    const reminderBody = req.body.reminder;
    const reminder = new Reminder();
    Object.assign(reminder,reminderBody);
    if(reminder.due_date.getTime() > Date.now() ) await createReminder(reminder,dbConn);
    throw "La fecha de finalizacion debe ser mayor que la actual"
}

export const deleteReminderHandler = async(req,dbConn : Connection) => {
    const reminderId = req.params.id;
    const reminder = await findReminder(reminderId,dbConn);
    if(reminder) await deleteReminder(reminderId, dbConn);
    throw "No existe el recordatorio";
}
export const updateReminderHandler = async(req,dbConn: Connection) => {
    const reminderId = req.params.id;
    const reminder = await findReminder(reminderId,dbConn);
    if(reminder) await createReminder(reminder, dbConn);
    throw "No existe el recordatorio";
}