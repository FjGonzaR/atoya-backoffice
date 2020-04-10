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
  dbConn: Connection
) => {
  let client = await dbConn.manager.findOne(Client, {
    where: { enterprise: clientArg.enterprise },
  });
  if (!client) {
    clientArg.forms = [];
    client = await dbConn.manager.save(clientArg);
  }
  let form = new Form();
  form.client = client;
  form.planningOrder = planningOrderArg;
  form = Object.assign(form, formArg);
  materials = createMaterials(materials, form);
  form.materials = materials;
  return await dbConn.manager.save(form);
};
export const getForm = async(formId : string,dbConn : Connection) => {
    return await dbConn.manager.findOne(Form, formId);
}

const createMaterials = (materials: Material[], form: Form) => {
  return materials.map((material) => {
    material.form = form;
    return material;
  });
};