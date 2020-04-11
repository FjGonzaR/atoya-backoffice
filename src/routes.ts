import express from "express";
import { getConnection } from "typeorm";
import { userLogInHandler, userSignUpHandler } from "./handler/UserHandler";
import { Routes } from "./routes/routes";
import {
  createFormHandler,
  sendFormToClientHandler,
} from "./handler/FormHandler";
import { checkToken } from "./utils/jwt";
const router = express.Router();
const wrapResponse = async (req, res, method) => {
  try {
    const response = await method;
    res.send(response);
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

export default router;
