import { Connection } from "typeorm";
import { User } from "../entity/User";

  export const userLogIn = async(email: string, password: string, dbConn : Connection):Promise<User> => {
    const user = await userExists(email,dbConn);
    if (user && user.password === password) return user;
    throw "Email y/o contraseñas incorrectos.";
  }
  export const userSignUp = async(email: string, password: string, dbConn : Connection) => {
    let user = await userExists(email, dbConn);
    if (!user) {
      user = new User();
      user.email = email;
      user.password = password;
      return await dbConn.manager.save(user);
    }
    throw "Este usuario ya existe.";
  }
  const userExists = async(email: string, dbConn : Connection) => {
    return await dbConn.manager.findOne(User,{ where: { email } });
  }

