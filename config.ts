import dotenv from 'dotenv';
dotenv.config();

export const environment = {
    source_email : process.env.SOURCE_EMAIL,
    source_password : process.env.SOURCE_PASSWORD
};