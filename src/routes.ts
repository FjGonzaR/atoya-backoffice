import express from "express";
import { getConnection } from "typeorm";
import { userLogInHandler, userSignUpHandler, dummy } from "./handler/UserHandler";
import { Routes } from "./routes/routes";
import {
  createFormHandler,
  sendFormToClientHandler,
  getForms,
  downloadForm,
  deleteFormHandler,
} from "./handler/FormHandler";
import { checkToken } from "./utils/jwt";
import { create } from "domain";
import { createReminderHandler, updateReminderHandler, deleteReminderHandler, getRemindersFormatted } from "./handler/ReminderHandler";
const router = express.Router();
const wrapResponse = async (req, res, method) => {
  try {
    const response = await method;
    res?res.send(response):false;
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};
router.post(
  Routes.LOGIN,
  async (req, res) =>
    await wrapResponse(req, res, userLogInHandler(req, getConnection()))
);
router.post(
  Routes.SIGNUP,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, res, userSignUpHandler(req, getConnection()))
);
router.post(
  Routes.FORM,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, res, createFormHandler(req, getConnection()))
);
router.put(
  Routes.MODIFY_FORM,
  async (req,res) => 
    await wrapResponse(req,res, createFormHandler(req,getConnection()))
);
router.delete(
  Routes.MODIFY_FORM,
  async (req,res) => 
    await wrapResponse(req,res, deleteFormHandler(req,getConnection()))
);
router.get(
  Routes.SEND_TO_CLIENT,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, res, sendFormToClientHandler(req,getConnection()))
);

router.get(
    Routes.ALL_FORMS,
    checkToken,
    async (req, res) =>
      await wrapResponse(req, res, getForms(req,getConnection()))
  );

router.get(
  Routes.DOWNLOAD,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, null, downloadForm(req,res,getConnection()))
);

router.post(
  Routes.CREATE_REMINDER,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, res, createReminderHandler(req,getConnection()))
);

router.put(
  Routes.MODIFY_REMINDER,
  checkToken,
  async(req,res) => 
    await wrapResponse(req,res, updateReminderHandler(req,getConnection()))
);

router.delete(
  Routes.MODIFY_REMINDER,
  async(req,res) => 
  await wrapResponse(req,res, deleteReminderHandler(req,getConnection()))
)
router.get(
  Routes.ALL_REMINDERS,
  async(req,res) => 
  await wrapResponse(req,res,getRemindersFormatted(req,getConnection()))
)

router.get(
  Routes.DUMMY,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, res, dummy(req, getConnection()))
);

export default router;
