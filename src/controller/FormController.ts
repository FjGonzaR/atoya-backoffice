import { Connection } from "typeorm";
import { Form } from "../entity/Form";
import { Material } from "../entity/Material";
import { Client } from "../entity/Client";
import { FormRequest } from "../types/form";
import { PlanningOrder } from "../entity/PlanningOrder";

export const createForm = async (
  formArg: FormRequest,
  materials: Partial<Material[]>,
  planningOrderArg: PlanningOrder,
  clientArg: Client,
  dbConn: Connection,
  formId?: string
) => {
  let client = await dbConn.manager.findOne(Client, {
    where: { enterprise: clientArg.enterprise },
  });
  if (!client) {
    clientArg.forms = [];
    client = await dbConn.manager.save(clientArg);
  }
  const formu = await dbConn.manager.findOne(Form, formId) ;
  let form = formu? formu : new Form();
  form.client = client;
  const today = new Date();
  form.id = `${today.getFullYear()}-${
    today.getMonth() + 1
  }-${today.getDate()}-${form.client.enterprise}`;
  form.planningOrder = planningOrderArg;
  form = Object.assign(form, formArg);
  materials = createMaterials(materials, form);
  form.materials = materials;
  return await dbConn.manager.save(form);
};
export const getForm = async (formId: string, dbConn: Connection) => {
  return await dbConn.manager.findOne(Form, formId);
};
export const getFormSummary = async (dbConn: Connection) => {
  return await dbConn.manager.find(Form, {
    relations: ["client"],
  });
};
export const getFormDetailed = async (formId: string, dbConn: Connection) => {
  return await dbConn.manager.findOne(Form, formId, {
    relations: ["client", "planningOrder", "materials"],
  });
};
export const deleteForm = async (formId: string, dbConn: Connection) => {
  dbConn.getRepository(Material).createQueryBuilder().delete().where({ formId }).execute();
  return await dbConn.manager.getRepository(Form).delete(formId);
};

const createMaterials = (materials: Material[], form: Form) => {
  return materials.map((material) => {
    material.form = form;
    return material;
  });
};
