import nodemailer from 'nodemailer';
import { EmailContent } from '../types/form';
import '../../config';


export const sendEmail = async(payload: EmailContent) => {
    const transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth: {
            user : process.env.SOURCE_EMAIL,
            pass : process.env.SOURCE_PASSWORD
        }
    });
    return await transporter.sendMail(payload);
    
}