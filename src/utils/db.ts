import { createConnection, Connection } from "typeorm";

export const connection = async () => {
  return createConnection();
};
