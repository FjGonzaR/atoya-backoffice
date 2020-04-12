import { Connection } from "typeorm";
import { userLogIn, userSignUp } from "../controller/UserController";
import { generateToken } from "../utils/jwt";

export const userLogInHandler = async (req, dbConn: Connection) => {
  const { email, password } = req.body;
  await userLogIn(email, password, dbConn);
  const token = generateToken(email);
  return { token };
};

export const userSignUpHandler = async (req, dbConn: Connection) => {
  const { email, password } = req.body;
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    await userSignUp(email, password, dbConn);
  else throw "Su email tiene un formato inválido";
  const token = generateToken(email);
  return { token };
};

export const dummy = async (req) => {
  return { healthCheck : "good" };
}
