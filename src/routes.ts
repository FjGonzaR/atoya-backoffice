import express from "express";
import { getConnection } from "typeorm";
import { userLogInHandler, userSignUpHandler, dummy } from "./handler/UserHandler";
import { Routes } from "./routes/routes";
import {
  createFormHandler,
  sendFormToClientHandler,
  getForms,
  downloadForm,
} from "./handler/FormHandler";
import { checkToken } from "./utils/jwt";
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
  Routes.CREATE_FROM,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, res, createFormHandler(req, getConnection()))
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

router.get(
  Routes.DUMMY,
  checkToken,
  async (req, res) =>
    await wrapResponse(req, null, dummy(req))
);

export default router;
