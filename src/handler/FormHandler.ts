import {
  createForm,
  getFormDetailed,
  getFormSummary,
} from "../controller/FormController";
import { Connection } from "typeorm";
import { Client } from "../entity/Client";
import { sendEmail } from "../utils/mail";
import { IForm } from "../types/form";
import path from "path";
import chunk from "nunjucks";
import { Form } from "../entity/Form";
import pdf from "html-pdf";
import fs from "fs";

chunk.configure(path.join(__dirname, "..", "..", "src/htmls"), {
  autoescape: true,
});
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
  const formId = req.params.id;
  const form = await getFormDetailed(formId, dbConn);
  const htmlBody = chunk.render("getForm.html", {
    cliente: form.client.enterprise,
    email: process.env.SOURCE_EMAIL,
  });
  const pdfHtml = getFormPdf(form);
  const serviceControl = fs.readFileSync("./src/htmls/Encuesta.pdf");
  pdf.create(pdfHtml,{
    format: "A3",
    border: "10px",
  }).toBuffer((err, buffer) => {
    if (err) throw err;
    sendEmail({
      to: form.client.email,
      from: "Atoya",
      subject: "Confirmación de solicitud.",
      html: htmlBody,
      attachments: [
        { filename: "atoyaSolicitud.pdf", content: buffer },
        { filename: "encuestaServicioYControl.pdf", content: serviceControl },
      ],
    })
      .then((value) => {
        return;
      })
      .catch((error) => {
        throw error;
      });
  });
  return { message: "Email enviado correctamente" };
};

export const downloadForm = async (req, res, dbConn: Connection) => {
  const formId = req.params.id;
  const form = await getFormDetailed(formId, dbConn);
  const pdfHtml = getFormPdf(form);
  pdf
    .create(pdfHtml, {
      format: "A3",
      border: "10px",
    })
    .toStream((err, stream) => {
      if (err) {
        throw err;
      }
      res.writeHead(200, {
        "Content-Type": "application/force-download",
        "Content-disposition": "attachment; filename=solicitud.pdf",
      });
      stream.pipe(res);
    });
};

export const getForms = async (req, dbConn: Connection) => {
  const forms = await getFormSummary(dbConn);
  if (forms) {
    return forms;
  }
  throw "Ocurrio un error al recopilar los formularios";
};
const getFormPdf = (form: Form) => {
  let newForm = changeBooleansAndDates(form);
  const pdfHtml = chunk.render("formPdf.html", newForm);
  return pdfHtml;
};
const changeBooleansAndDates = (form: IForm) => {
  form.beginning_hour = form.beginning_hour.toLocaleString("es-CO");
  form.finishing_hour = form.finishing_hour.toLocaleString("es-CO");
  form.created_at = form.created_at.toLocaleString("es-CO");
  form.vfn = form.vfn ? form.vfn : "No";
  form.vft = form.vft ? form.vft : "No";
  form.vnt = form.vnt ? form.vnt : "No";
  form.ups_dosing = form.ups_dosing ? "Sí" : "No";
  form.revisionsPdf = form.revisions.replace(";", ",");
  form.planningOrder.activities = form.planningOrder.activities ? "Sí" : "No";
  form.planningOrder.considerations = form.planningOrder.considerations ? "Sí" : "No";
  form.planningOrder.responsabilities = form.planningOrder.responsabilities ? "Sí" : "No";
  return form;
};
