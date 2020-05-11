import { Reminder } from "../entity/Reminder";
import { Connection } from "typeorm";

export const createReminder = async (
  reminder: Reminder,
  dbConn: Connection
) => {
  await dbConn.manager.save(reminder);
};

export const deleteReminder = async (
  reminderId: string,
  dbConn: Connection
) => {
  await dbConn.getRepository(Reminder).delete(reminderId);
};

export const findReminder = async (reminderId: string, dbConn: Connection) =>
  await dbConn.manager.findOne(Reminder, reminderId);

export const getReminders = async (dbConn: Connection) => {
  const duedReminders = dbConn.manager
    .getRepository(Reminder)
    .createQueryBuilder("reminder")
    .where("reminder.due_date < now()")
    .orderBy("reminder.due_date", "ASC")
    .getMany();

  const soonToBe = dbConn.manager
    .getRepository(Reminder)
    .createQueryBuilder("reminder")
    .where("DATE_PART('day', reminder.due_date - now()) <= 15 AND DATE_PART('day', reminder.due_date - now()) > 0")
    .orderBy("reminder.due_date", "DESC")
    .getMany();

    const all = dbConn.manager.find(Reminder);

    return Promise.all([duedReminders,soonToBe,all]);
};
