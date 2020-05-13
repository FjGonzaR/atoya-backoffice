import { Connection } from "typeorm";
import { Reminder } from "../entity/Reminder";
import {
  createReminder,
  findReminder,
  deleteReminder,
  getReminders,
} from "../controller/ReminderController";
import { ReminderFormat } from "../types/reminder";

export const createReminderHandler = async (req, dbConn: Connection) => {
  const reminderBody = req.body;
  const reminder = new Reminder();
  Object.assign(reminder, reminderBody);
  reminder.due_date = new Date(reminderBody.due_date);
  if (reminder.due_date.getTime() > Date.now()) {
    await createReminder(reminder, dbConn);
    return { msg: "Recordatorio creado con exito" };
  }
  throw "La fecha de finalizacion debe ser mayor que la actual";
};

export const deleteReminderHandler = async (req, dbConn: Connection) => {
  const reminderId = req.params.id;
  const reminder = await findReminder(reminderId, dbConn);
  if (reminder) {
    await deleteReminder(reminderId, dbConn);
    return { msg: "Recordatorio eliminado con exito" };
  }
  throw "No existe el recordatorio";
};
export const updateReminderHandler = async (req, dbConn: Connection) => {
  const reminderId = req.params.id;
  const reminderBody = req.body;
  const reminder = await findReminder(reminderId, dbConn);
  Object.assign(reminder, reminderBody);
  if (reminder) {
    await createReminder(reminder, dbConn);
    return { msg: "Recordatorio modificado con éxito." };
  }
  throw "No existe el recordatorio";
};

export const getRemindersFormatted = async (req, dbConn: Connection) => {
  const reminders = await getReminders(dbConn);
  let payload = new ReminderFormat(reminders[0],reminders[1],  reminders[2]);
  return payload;
};
