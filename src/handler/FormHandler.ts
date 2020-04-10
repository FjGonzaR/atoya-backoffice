import { createForm, getForm } from "../controller/FormController";
import { Connection } from "typeorm";
import { Client } from "../entity/Client";
import { sendEmail } from "../utils/mail";
import { Attachment } from "../types/form";
import path from 'path';
import chunk from 'nunjucks';

chunk.configure(path.join(__dirname, '..', '..', 'htmls'), { autoescape : true});

export const createFormHandler = async (req, dbConn: Connection) => {
  const form = req.body.form;
  const materials = req.body.materials;
  const client = req.body.client;
  const planningOrder = req.body.planning_order;
  client.forms = [];
  const cliente = new Client();
  Object.assign(cliente, client);
  await createForm(form, materials, planningOrder, cliente, dbConn);
  return { message: "Form created successfully" };
};

export const sendFormToClientHandler = async (req, dbConn: Connection) => {
  const formId = req.params.form_id;
  const form = await getForm(formId, dbConn);
  const htmlBody = chunk.render('getForm.html',{cliente : form.client.enterprise, email : process.env.SOURCE_EMAIL});
  const resp = await Promise.all([getFormPdf(), getServiceControlPdf()]);
  await sendEmail({
    to: form.client.email,
    from: "Atoya",
    subject: "Confirmación de solicitud.",
    html: htmlBody,
    attachment : resp
  });
};

const getFormPdf = async (): Promise<Attachment> => {
  return null;
};

 const getServiceControlPdf = async (): Promise<Attachment> => {
  return null;
};
