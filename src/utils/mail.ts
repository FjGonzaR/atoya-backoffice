import nodemailer from 'nodemailer';
import { EmailContent } from '../types/form';
import { environment } from '../../config';


export const sendEmail = async(payload: EmailContent) => {
    const transporter = nodemailer.createTransport({
        service : 'Gmail',
        auth: {
            user : environment.source_email,
            pass : environment.source_password
        }
    });
    return await transporter.sendMail(payload);
    
}